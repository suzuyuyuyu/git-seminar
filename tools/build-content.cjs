/* Markdown is the editing source; docs/course.json is a generated delivery file. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const readJSON = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const fail = (file, message) => { throw new Error(`${path.relative(root, file)}: ${message}`); };

function parseSection(source, file = 'section.md') {
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
  const chapters = [], lessons = [], chapterIds = new Set(), lessonIds = new Set();
  const folders = fs.readdirSync(contentRoot, { withFileTypes: true }).filter(entry => entry.isDirectory() && /^\d+-/.test(entry.name)).sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }));
  for (const folder of folders) {
    const directory = path.join(contentRoot, folder.name);
    const metadataPath = path.join(directory, 'lesson.json');
    const { chapter, graph, sections: files, ...lesson } = readJSON(metadataPath);
    if (!chapter?.id || !lesson.id || !lesson.diagram) fail(metadataPath, 'chapter、lessonのid、diagramが必要です。');
    if (chapterIds.has(chapter.id) || lessonIds.has(lesson.id)) fail(metadataPath, '章またはレッスンのidが重複しています。');
    chapterIds.add(chapter.id); lessonIds.add(lesson.id);
    chapters.push({ ...chapter, status: 'ready', lessonId: lesson.id });
    lesson.chapterId = chapter.id;
    if (graph) {
      const graphPath = path.resolve(directory, graph);
      if (!graphPath.startsWith(directory + path.sep)) fail(metadataPath, 'graphは章フォルダー内のJSONを指定してください。');
      lesson.graph = readJSON(graphPath);
    }
    if (!Array.isArray(files) || !files.length) fail(metadataPath, 'sectionsにMarkdownファイル名の配列を1件以上指定してください。');
    const filenames = new Set();
    for (const name of files) {
      if (typeof name !== 'string' || !/^[^\\/:*?"<>|\s]+\.md$/.test(name) || name.startsWith('.')) {
        fail(metadataPath, `sectionsには章フォルダー直下のMarkdownファイル名を指定してください: ${JSON.stringify(name)}`);
      }
      const key = name.toLowerCase();
      if (filenames.has(key)) fail(metadataPath, `sectionsのファイル名が重複: ${name}`);
      filenames.add(key);
      const file = path.join(directory, name);
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) fail(metadataPath, `sectionsのMarkdownが見つかりません: ${name}`);
    }
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.isFile() && /\.md$/i.test(entry.name) && !/^readme\.md$/i.test(entry.name) && !files.includes(entry.name)) {
        onWarning(`${path.relative(root, path.join(directory, entry.name))}: sections未登録のため下書きとして除外します。公開する場合はlesson.jsonのsectionsへ追加してください。`);
      }
    }
    lesson.sections = files.map(name => {
      const file = path.join(directory, name);
      return parseSection(fs.readFileSync(file, 'utf8'), file);
    });
    const ids = new Set();
    for (const section of lesson.sections) {
      if (ids.has(section.id)) fail(metadataPath, `節のidが重複: ${section.id}`);
      ids.add(section.id);
    }
    lessons.push(lesson);
  }
  if (!lessons.length) throw new Error('章が見つかりません。');
  const data = { ...course, chapters, lessons };
  const serialized = JSON.stringify(data, null, 2) + '\n';
  if (output && (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== serialized)) fs.writeFileSync(output, serialized);
  return data;
}

module.exports = { buildCourse, parseSection };
if (require.main === module) {
  try {
    const data = buildCourse();
    console.log(`Generated: ${data.chapters.length} chapters, ${data.lessons.reduce((sum, lesson) => sum + lesson.sections.length, 0)} sections.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
