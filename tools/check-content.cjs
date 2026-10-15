/* Generate and verify the Markdown course contract and local vector assets. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { buildCourse } = require('./build-content.cjs');
const docs = path.resolve(__dirname, '../docs');
const html = fs.readFileSync(path.join(docs, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\s+src="([^"]+)"[^>]*>/g)].map(match => match[1]);
const failures = [];
function check(condition, message) { if (!condition) failures.push(message); }
for (const script of scripts) {
  const filename = path.join(docs, script);
  check(fs.existsSync(filename), `Missing script: ${script}`);
  if (fs.existsSync(filename)) new vm.Script(fs.readFileSync(filename, 'utf8'), { filename });
}
const data = buildCourse();
const lessonIds = new Set();
const svgCache = new Map();
function loadSVG(src) {
  if (svgCache.has(src)) return svgCache.get(src);
  const filename = path.resolve(docs, src);
  check(filename.startsWith(docs + path.sep), `Asset leaves docs: ${src}`);
  check(fs.existsSync(filename), `Missing SVG: ${src}`);
  if (!fs.existsSync(filename)) return '';
  const svg = fs.readFileSync(filename, 'utf8');
  check(!/data:image\/(?:png|jpe?g|webp)|\bhref=['"][^'"]*\.(?:png|jpe?g|webp)(?:[?#][^'"]*)?['"]/i.test(svg), `Raster image embedded in vector diagram: ${src}`);
  const withoutCDATA = svg.replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '');
  check(!/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/.test(withoutCDATA), `Unescaped SVG ampersand: ${src}`);
  for (const image of svg.matchAll(/<image\b[^>]*\bhref=['"]([^'"]+)['"]/g)) {
    if (!/^(https?:|data:|#)/.test(image[1])) check(fs.existsSync(path.resolve(path.dirname(filename), image[1])), `Missing illustration: ${src} -> ${image[1]}`);
  }
  svgCache.set(src, svg);
  return svg;
}
let sectionCount = 0;
for (const lesson of data.lessons) {
  check(!lessonIds.has(lesson.id), `Duplicate lesson: ${lesson.id}`);
  lessonIds.add(lesson.id);
  check(data.chapters.some(chapter => chapter.id === lesson.chapterId), `Unknown chapter: ${lesson.id}`);
  check(lesson.sections.length > 0, `Empty lesson: ${lesson.id}`);
  const sectionIds = new Set();
  const noteIds = new Set();
  for (const section of lesson.sections) {
    const diagram = section.diagram || lesson.diagram || { type: 'svg', src: 'assets/record-flow.svg' };
    const svg = diagram.type === 'commit-graph' ? '' : loadSVG(diagram.src);
    sectionCount++;
    check(!sectionIds.has(section.id), `Duplicate section: ${lesson.id}/${section.id}`);
    sectionIds.add(section.id);
    check(section.title && section.takeaway && Array.isArray(section.body) && section.body.length, `Incomplete text: ${lesson.id}/${section.id}`);
    check(section.command === null || typeof section.command === 'string', `Invalid command: ${lesson.id}/${section.id}`);
    for (const line of section.presentationCommandLines || []) {
      check(Number.isInteger(line) && line >= 0 && line < (section.command || '').split('\n').length, `Invalid slide code line: ${lesson.id}/${section.id}/${line}`);
    }
    for (const note of section.notes) {
      check(!noteIds.has(note.id), `Duplicate note: ${lesson.id}/${note.id}`);
      noteIds.add(note.id);
      check(note.body && typeof note.showInPresentation === 'boolean', `Invalid note: ${note.id}`);
    }
    if (svg) {
      const states = [...svg.matchAll(/<g\b[^>]*\bdata-state=['"]([^'"]+)['"]/g)].map(match => match[1]);
      check(!states.length || states.includes(section.diagramState), `Missing SVG state: ${lesson.id}/${section.diagramState}`);
    }
    if (diagram.type === 'commit-graph') {
      const state = lesson.graph.states[section.diagramState];
      check(Boolean(state), `Missing graph state: ${section.diagramState}`);
      if (!state) continue;
      const ids = new Set(lesson.graph.nodes.map(node => node.id));
      for (const node of lesson.graph.nodes) {
        for (const parent of node.parents) check(ids.has(parent), `Unknown graph parent: ${parent}`);
      }
      for (const id of [...state.visible, ...(state.focus || []), ...Object.values(state.branches || {})]) {
        check(ids.has(id) && state.visible.includes(id), `Invalid graph reference: ${id}`);
      }
      if (state.head?.branch) check(Boolean(state.branches[state.head.branch]), `Unknown HEAD branch: ${state.head.branch}`);
      if (state.head?.commit) check(ids.has(state.head.commit) && state.visible.includes(state.head.commit), `Unknown detached HEAD: ${state.head.commit}`);
    }
  }
  for (const source of lesson.sources || []) {
    check(source.label && /^https:\/\//.test(source.url), `Invalid reference: ${lesson.id}`);
  }
}
for (const chapter of data.chapters) {
  check(chapter.status === 'ready', `Chapter is not implemented: ${chapter.id}`);
  check(lessonIds.has(chapter.lessonId), `Missing chapter lesson: ${chapter.id}`);
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else console.log(`OK: ${data.chapters.length} chapters, ${data.lessons.length} lessons, ${sectionCount} sections; all shared data and assets resolve.`);
