/* Markdown is the editing source; docs/course.json is a generated delivery file. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const fail = (file, message) => { throw new Error(`${path.relative(root, file)}: ${message}`); };

function parseStep(source, file = 'step.md') {
  const text = source.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const front = text.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!front) fail(file, '先頭に --- で囲んだ設定が必要です。');
  const meta = {};
  const allowed = new Set(['id', 'title', 'state', 'diagram', 'wide', 'presentation-lines']);
  for (const line of front[1].split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const match = line.match(/^([a-z-]+):\s*(.*?)\s*$/);
    if (!match || !allowed.has(match[1])) fail(file, `不明な設定: ${line}`);
    if (Object.hasOwn(meta, match[1])) fail(file, `設定が重複: ${match[1]}`);
    try { meta[match[1]] = match[2].startsWith('"') ? JSON.parse(match[2]) : match[2]; }
    catch { fail(file, `設定の引用符を確認してください: ${line}`); }
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.id || '') || !meta.title) fail(file, 'id（半角英数とハイフン）とtitleが必要です。');
  const blocks = { body: [] };
  let block = 'body', fence = null;
  const headings = { '## コマンド': 'command', '## 要点': 'takeaway', '## 付箋': 'notes' };
  for (const line of text.slice(front[0].length).split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker && !fence) fence = marker[1];
    else if (marker && fence && marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
    if (!fence && Object.hasOwn(headings, line)) {
      block = headings[line];
      if (blocks[block]) fail(file, `見出しが重複: ${line}`);
      blocks[block] = [];
    } else blocks[block].push(line);
  }
  if (fence) fail(file, 'コードブロックを閉じてください。');
  const value = name => (blocks[name] || []).join('\n').trim();
  if (!value('body') || !value('takeaway')) fail(file, '本文と「## 要点」が必要です。');
  let command = null;
  if (value('command')) {
    const match = value('command').match(/^(`{3,}|~{3,})[^\n]*\n([\s\S]*?)\n\1$/);
    if (!match) fail(file, '「## コマンド」は1つのコードブロックで囲んでください。');
    command = match[2];
  }
  const notes = [];
  let current;
  for (const line of blocks.notes || []) {
    const match = line.match(/^### ([a-z0-9]+(?:-[a-z0-9]+)*)(?:\s+(\[講義\]))?\s*$/);
    if (match) {
      current = { id: match[1], lines: [], showInPresentation: Boolean(match[2]) };
      notes.push(current);
    } else if (current) current.lines.push(line);
    else if (line.trim()) fail(file, '付箋は「### note-id」、講義にも出す場合は「### note-id [講義]」で始めます。');
  }
  const section = {
    id: meta.id, title: meta.title, body: [value('body')], command,
    takeaway: value('takeaway'),
    notes: notes.map(({ id, lines, showInPresentation }) => {
      const body = lines.join('\n').trim();
      if (!body) fail(file, `付箋が空です: ${id}`);
      return { id, body, showInPresentation };
    }),
    diagramState: meta.state || meta.id,
  };
  if (meta.diagram) {
    section.diagram = meta.diagram === 'commit-graph' ? { type: 'commit-graph' } : { type: 'svg', src: meta.diagram };
    if (meta.wide) {
      if (!['true', 'false'].includes(meta.wide)) fail(file, 'wideはtrueまたはfalseです。');
      section.diagram.wide = meta.wide === 'true';
    }
  }
  if (meta['presentation-lines']) {
    const lines = String(meta['presentation-lines']).split(',').map(s => s.trim());
    if (!lines.every(s => /^\d+$/.test(s))) fail(file, 'presentation-linesは0始まりの行番号をカンマ区切りで指定します。');
    section.presentationCommandLines = lines.map(Number);
  }
  return section;
}

function buildCourse({ contentRoot = path.join(root, 'content'), output = path.join(root, 'docs/course.json'), onWarning = console.warn } = {}) {
  const course = readJSON(path.join(contentRoot, 'course.json'));
  const chapters = [], sections = [], chapterIds = new Set(), routes = new Set();
  const slug = value => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
  const child = (directory, name, extension = '') => {
    if (typeof name !== 'string' || !/^[^\\/:*?"<>|\s]+$/.test(name) || name.startsWith('.') || (extension && !name.endsWith(extension))) {
      fail(directory, `直下の${extension || 'フォルダー'}名を指定してください: ${JSON.stringify(name)}`);
    }
    const resolved = path.join(directory, name);
    if (!fs.existsSync(resolved)) fail(directory, `ファイルまたはフォルダーが見つかりません: ${name}`);
    return resolved;
  };
  const ordered = (value, file, key) => {
    if (!Array.isArray(value) || !value.length) fail(file, `${key}に名前の配列を1件以上指定してください。`);
    const names = new Set();
    for (const name of value) {
      if (typeof name !== 'string') fail(file, `${key}の名前を文字列で指定してください。`);
      if (names.has(name.toLowerCase())) fail(file, `${key}の名前が重複: ${name}`);
      names.add(name.toLowerCase());
    }
    return value;
  };
  const folders = fs.readdirSync(contentRoot, { withFileTypes: true }).filter(entry => entry.isDirectory() && /^\d+-/.test(entry.name)).sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }));
  for (const folder of folders) {
    const directory = path.join(contentRoot, folder.name);
    const metadataPath = path.join(directory, 'chapter.json');
    const { sections: sectionFolders, ...chapter } = readJSON(metadataPath);
    if (!slug(chapter.id) || !chapter.title) fail(metadataPath, 'chapterのidとtitleが必要です。');
    if (chapterIds.has(chapter.id)) fail(metadataPath, `chapterのidが重複: ${chapter.id}`);
    chapterIds.add(chapter.id);
    chapter.sectionIds = [];
    const sectionIds = new Set();
    for (const name of ordered(sectionFolders, metadataPath, 'sections')) {
      const sectionDirectory = child(directory, name);
      const sectionPath = path.join(sectionDirectory, 'section.json');
      const { steps: files, graph, ...section } = readJSON(sectionPath);
      if (!slug(section.id) || !section.title || !section.diagram) fail(sectionPath, 'sectionのid、title、diagramが必要です。');
      if (sectionIds.has(section.id)) fail(sectionPath, `sectionのidが重複: ${section.id}`);
      sectionIds.add(section.id);
      section.chapterId = chapter.id;
      section.route = `${chapter.id}/${section.id}`;
      chapter.sectionIds.push(section.id);
      if (graph) {
        const graphPath = path.resolve(contentRoot, graph);
        if (!graphPath.startsWith(path.resolve(contentRoot) + path.sep)) fail(sectionPath, 'graphはcontent内のJSONを指定してください。');
        section.graph = readJSON(graphPath);
      }
      const stepFiles = ordered(files, sectionPath, 'steps');
      section.steps = stepFiles.map(filename => {
        const file = child(sectionDirectory, filename, '.md');
        if (!fs.statSync(file).isFile()) fail(file, 'Markdownファイルを指定してください。');
        return parseStep(fs.readFileSync(file, 'utf8'), file);
      });
      const ids = new Set();
      for (const step of section.steps) {
        if (ids.has(step.id)) fail(sectionPath, `stepのidが重複: ${step.id}`);
        ids.add(step.id);
        routes.add(`${section.route}/${step.id}`);
      }
      for (const entry of fs.readdirSync(sectionDirectory, { withFileTypes: true })) {
        if (entry.isFile() && /\.md$/i.test(entry.name) && !/^readme\.md$/i.test(entry.name) && !stepFiles.includes(entry.name)) {
          onWarning(`${path.relative(root, path.join(sectionDirectory, entry.name))}: steps未登録のため下書きとして除外します。公開する場合はsection.jsonのstepsへ追加してください。`);
        }
      }
      sections.push(section);
    }
    chapters.push(chapter);
  }
  if (!sections.length) throw new Error('Sectionが見つかりません。');
  for (const [from, to] of Object.entries(course.redirects || {})) {
    if (!routes.has(to)) fail(path.join(contentRoot, 'course.json'), `旧URLの転送先が存在しません: ${from} → ${to}`);
  }
  const data = { ...course, schemaVersion: 2, chapters, sections };
  const serialized = JSON.stringify(data, null, 2) + '\n';
  if (output && (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== serialized)) fs.writeFileSync(output, serialized);
  return data;
}

module.exports = { buildCourse, parseStep };
if (require.main === module) {
  try {
    const data = buildCourse();
    console.log(`Generated: ${data.chapters.length} chapters, ${data.sections.length} sections, ${data.sections.reduce((sum, section) => sum + section.steps.length, 0)} steps.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
