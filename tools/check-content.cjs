/* Generate and verify the Chapter → Section → Step contract and local vectors. */
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
  const filename = path.resolve(docs, script);
  check(filename.startsWith(docs + path.sep), `Script leaves docs: ${script}`);
  check(fs.existsSync(filename), `Missing script: ${script}`);
  if (fs.existsSync(filename)) new vm.Script(fs.readFileSync(filename, 'utf8'), { filename });
}
const data = buildCourse();
check(data.schemaVersion === 2, 'Expected schemaVersion 2');
const chapterIds = new Set();
const sectionRoutes = new Set();
const stepRoutes = new Set();
const svgCache = new Map();
function loadSVG(src) {
  if (svgCache.has(src)) return svgCache.get(src);
  if (typeof src !== 'string') { check(false, `Invalid SVG path: ${src}`); return ''; }
  const filename = path.resolve(docs, src);
  if (!filename.startsWith(docs + path.sep)) { check(false, `Asset leaves docs: ${src}`); return ''; }
  check(fs.existsSync(filename), `Missing SVG: ${src}`);
  if (!fs.existsSync(filename)) return '';
  const svg = fs.readFileSync(filename, 'utf8');
  check(/<svg\b/.test(svg), `Invalid SVG: ${src}`);
  check(!/data:image\/(?:png|jpe?g|webp)|\bhref=['"][^'"]*\.(?:png|jpe?g|webp)(?:[?#][^'"]*)?['"]/i.test(svg), `Raster image embedded in vector diagram: ${src}`);
  const withoutCDATA = svg.replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '');
  check(!/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/.test(withoutCDATA), `Unescaped SVG ampersand: ${src}`);
  for (const image of svg.matchAll(/<image\b[^>]*\bhref=['"]([^'"]+)['"]/g)) {
    if (!/^(https?:|data:|#)/.test(image[1])) {
      const illustration = path.resolve(path.dirname(filename), image[1]);
      check(illustration.startsWith(docs + path.sep) && fs.existsSync(illustration), `Missing illustration: ${src} -> ${image[1]}`);
    }
  }
  svgCache.set(src, svg);
  return svg;
}
function graphReferences(graph, context) {
  check(Array.isArray(graph?.nodes) && graph?.states && typeof graph.states === 'object', `Invalid graph: ${context}`);
  if (!Array.isArray(graph?.nodes) || !graph?.states) return;
  const ids = new Set();
  for (const node of graph.nodes) {
    check(!ids.has(node.id), `Duplicate graph node: ${context}/${node.id}`);
    ids.add(node.id);
  }
  for (const node of graph.nodes) {
    check(Array.isArray(node.parents), `Invalid graph parents: ${context}/${node.id}`);
    for (const parent of node.parents || []) check(ids.has(parent), `Unknown graph parent: ${context}/${parent}`);
  }
  for (const [name, state] of Object.entries(graph.states)) {
    const visible = state.visible || [...ids];
    check(Array.isArray(visible), `Invalid graph visible: ${context}/${name}`);
    if (!Array.isArray(visible)) continue;
    const references = [...visible, ...(state.focus || []), ...Object.values(state.branches || {})];
    for (const id of references) check(ids.has(id) && visible.includes(id), `Invalid graph reference: ${context}/${name}/${id}`);
    for (const [id, parents] of Object.entries(state.parents || {})) {
      check(ids.has(id) && visible.includes(id), `Invalid graph parent override: ${context}/${name}/${id}`);
      for (const parent of parents) check(ids.has(parent) && visible.includes(parent), `Unknown graph override parent: ${context}/${name}/${parent}`);
    }
    for (const property of ['nodePositions', 'labels', 'nodeColors', 'focusColors']) {
      for (const id of Object.keys(state[property] || {})) check(ids.has(id), `Unknown graph ${property}: ${context}/${name}/${id}`);
    }
    if (state.head?.branch) check(Boolean(state.branches?.[state.head.branch]), `Unknown HEAD branch: ${context}/${name}/${state.head.branch}`);
    if (state.head?.commit) check(ids.has(state.head.commit) && visible.includes(state.head.commit), `Unknown detached HEAD: ${context}/${name}/${state.head.commit}`);
  }
}
for (const chapter of data.chapters) {
  check(!chapterIds.has(chapter.id), `Duplicate chapter: ${chapter.id}`);
  chapterIds.add(chapter.id);
  check(chapter.title && Array.isArray(chapter.sectionIds) && chapter.sectionIds.length, `Incomplete chapter: ${chapter.id}`);
  const actual = data.sections.filter(section => section.chapterId === chapter.id).map(section => section.id);
  check(JSON.stringify(actual) === JSON.stringify(chapter.sectionIds), `Chapter Section order mismatch: ${chapter.id}`);
  check(new Set(chapter.sectionIds).size === chapter.sectionIds.length, `Duplicate Section ID in chapter: ${chapter.id}`);
}
let stepCount = 0;
for (const section of data.sections) {
  const context = `${section.chapterId}/${section.id}`;
  check(section.route === context, `Invalid Section route: ${context}`);
  check(!sectionRoutes.has(context), `Duplicate Section: ${context}`);
  sectionRoutes.add(context);
  check(chapterIds.has(section.chapterId), `Unknown chapter: ${context}`);
  check(section.title && Array.isArray(section.steps) && section.steps.length, `Empty Section: ${context}`);
  if (section.graph) graphReferences(section.graph, context);
  const ids = new Set();
  const noteIds = new Set();
  for (const step of section.steps) {
    const route = `${context}/${step.id}`;
    stepCount++;
    check(!ids.has(step.id), `Duplicate Step: ${route}`);
    ids.add(step.id);
    stepRoutes.add(route);
    check(step.title && step.takeaway && Array.isArray(step.body) && step.body.length, `Incomplete text: ${route}`);
    check(step.command === null || typeof step.command === 'string', `Invalid command: ${route}`);
    for (const line of step.presentationCommandLines || []) {
      check(Number.isInteger(line) && line >= 0 && line < (step.command || '').split('\n').length, `Invalid slide code line: ${route}/${line}`);
    }
    for (const note of step.notes || []) {
      check(!noteIds.has(note.id), `Duplicate note in Section: ${context}/${note.id}`);
      noteIds.add(note.id);
      check(note.body && typeof note.showInPresentation === 'boolean', `Invalid note: ${route}/${note.id}`);
    }
    const diagram = step.diagram || section.diagram;
    check(diagram && ['svg', 'commit-graph'].includes(diagram.type), `Invalid diagram: ${route}`);
    if (diagram?.type === 'svg') {
      const svg = loadSVG(diagram.src);
      const states = [...svg.matchAll(/<g\b[^>]*\bdata-state=['"]([^'"]+)['"]/g)].map(match => match[1]);
      check(!states.length || states.includes(step.diagramState), `Missing SVG state: ${route}/${step.diagramState}`);
    } else if (diagram?.type === 'commit-graph') {
      check(Boolean(section.graph?.states?.[step.diagramState]), `Missing graph state: ${route}/${step.diagramState}`);
    }
  }
  for (const source of section.sources || []) check(source.label && /^https:\/\//.test(source.url), `Invalid reference: ${context}`);
}
for (const [from, to] of Object.entries(data.redirects || {})) check(stepRoutes.has(to), `Unresolved redirect: ${from} -> ${to}`);
if (failures.length) {
  console.error([...new Set(failures)].join('\n'));
  process.exitCode = 1;
} else console.log(`OK: ${data.chapters.length} chapters, ${data.sections.length} sections, ${stepCount} steps; shared data, redirects, graphs and vector assets resolve.`);
