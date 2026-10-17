const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { buildCourse, parseSection } = require('./build-content.cjs');

const section = (id = 'new-section') => `---\nid: ${id}\ntitle: 追加する節\nstate: stage\n---\n\n**本文**を編集します。\n\n- 項目1\n- 項目2\n\n## コマンド\n\n\`\`\`\`sh\n# 予約見出しもコマンド内では文章として扱う\n## 要点\n\n\`\`\`sh\nhello\n\`\`\`\n\`\`\`\`\n\n## 要点\n\n講義用の要点です。\n\n## 付箋\n\n### detail\n\n自学習だけの付箋。\n\n### explanation [講義]\n\n講義でも出す付箋。\n`;

test('Markdown本文、コード内の予約見出し、付箋の公開範囲を保持する', () => {
  const result = parseSection(section());
  assert.match(result.body[0], /\*\*本文\*\*/);
  assert.match(result.body[0], /- 項目2/);
  assert.match(result.command, /## 要点\n\n```sh/);
  assert.equal(result.takeaway, '講義用の要点です。');
  assert.deepEqual(result.notes.map(note => note.showInPresentation), [false, true]);
  assert.equal(result.diagramState, 'stage');
});

test('記入漏れと重複設定をファイル名付きで報告する', () => {
  assert.throws(() => parseSection(section().replace('id: new-section', 'id: 不正'), 'sample.md'), /sample.md: id/);
  assert.throws(() => parseSection(section().replace('state: stage', 'state: stage\nstate: stage')), /設定が重複/);
  assert.throws(() => parseSection(section().replace('## 要点\n\n講義用の要点です。', '')), /本文と「## 要点」/);
  assert.throws(() => parseSection(section() + '\n```\n閉じ忘れ'), /コードブロックを閉じ/);
});

test('sectionsの順序・登録・下書き・不正な一覧を検証する', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'git-seminar-content-'));
  try {
    const directory = path.join(temp, '00-example');
    fs.mkdirSync(directory);
    fs.writeFileSync(path.join(temp, 'course.json'), JSON.stringify({ title: 'Test' }));
    const configure = sections => fs.writeFileSync(path.join(directory, 'lesson.json'), JSON.stringify({ chapter: { id: 'example' }, id: 'example', diagram: { type: 'svg', src: 'assets/record-flow.svg' }, sections }));
    const file = (name, id) => fs.writeFileSync(path.join(directory, name), section(id));
    const warnings = [];
    const build = () => buildCourse({ contentRoot: temp, output: null, onWarning: message => warnings.push(message) });
    const ids = () => build().lessons[0].sections.map(s => s.id);
    file('alpha.md', 'first');
    file('zulu.md', 'second');
    fs.writeFileSync(path.join(directory, 'README.md'), '執筆メモ');
    configure(['zulu.md', 'alpha.md']);
    assert.deepEqual(ids(), ['second', 'first']);
    assert.equal(warnings.length, 0);
    configure(['alpha.md', 'zulu.md']);
    assert.deepEqual(ids(), ['first', 'second']);
    fs.writeFileSync(path.join(directory, 'draft.md'), 'まだ書式を整えていない下書き');
    assert.deepEqual(ids(), ['first', 'second']);
    assert.match(warnings.at(-1), /draft.md: sections未登録/);
    file('draft.md', 'added');
    configure(['alpha.md', 'draft.md', 'zulu.md']);
    warnings.length = 0;
    assert.deepEqual(ids(), ['first', 'added', 'second']);
    assert.equal(warnings.length, 0);
    configure(['alpha.md', 'zulu.md']);
    assert.deepEqual(ids(), ['first', 'second']);
    configure(['alpha.md', 'missing.md']);
    assert.throws(build, /lesson.json: sectionsのMarkdownが見つかりません: missing.md/);
    for (const invalid of [undefined, [], 'alpha.md']) {
      configure(invalid);
      assert.throws(build, /sectionsにMarkdownファイル名の配列/);
    }
    for (const invalid of ['../outside.md', 'nested/file.md', 'nested\\file.md', '/absolute.md', 'C:\\outside.md', 'graph.json', null]) {
      configure([invalid]);
      assert.throws(build, /章フォルダー直下のMarkdownファイル名/);
    }
    for (const duplicate of ['alpha.md', 'ALPHA.md']) {
      configure(['alpha.md', duplicate]);
      assert.throws(build, /sectionsのファイル名が重複/);
    }
    file('duplicate.md', 'first');
    configure(['alpha.md', 'duplicate.md']);
    assert.throws(build, /節のidが重複: first/);
  } finally {
    // Only the exact temporary directory created above is removed.
    assert.equal(path.dirname(path.resolve(temp)), path.resolve(os.tmpdir()));
    assert.match(path.basename(temp), /^git-seminar-content-/);
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
