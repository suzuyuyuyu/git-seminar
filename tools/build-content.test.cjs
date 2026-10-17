const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { buildCourse, parseStep } = require('./build-content.cjs');

const step = (id = 'first') => `---\nid: ${id}\ntitle: 例\nstate: stage\n---\n\n**本文**\n\n## コマンド\n\n\`\`\`\`sh\n## 要点\n\`\`\`sh\nhello\n\`\`\`\n\`\`\`\`\n\n## 要点\n\n要点です。\n\n## 付箋\n\n### detail\n\n自学習用。\n\n### explanation [講義]\n\n講義用。\n`;
const writeJSON = (file, value) => fs.writeFileSync(file, JSON.stringify(value));
function fixture(run) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'git-seminar-content-'));
  try {
    writeJSON(path.join(directory, 'course.json'), { title: 'Test' });
    const chapter = (folder, id, sections) => {
      const location = path.join(directory, folder);
      fs.mkdirSync(location, { recursive: true });
      writeJSON(path.join(location, 'chapter.json'), { id, title: id, sections });
      return location;
    };
    const section = (chapterDirectory, folder, id, steps = ['first.md']) => {
      const location = path.join(chapterDirectory, folder);
      fs.mkdirSync(location, { recursive: true });
      writeJSON(path.join(location, 'section.json'), { id, title: id, diagram: { type: 'svg', src: 'assets/example.svg' }, steps });
      for (const filename of steps) fs.writeFileSync(path.join(location, filename), step(path.basename(filename, '.md')));
      return location;
    };
    const warnings = [];
    run({ directory, chapter, section, warnings, build: () => buildCourse({ contentRoot: directory, output: null, onWarning: message => warnings.push(message) }) });
  } finally {
    assert.equal(path.dirname(path.resolve(directory)), path.resolve(os.tmpdir()));
    assert.match(path.basename(directory), /^git-seminar-content-/);
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test('StepのMarkdown、コード内の予約見出し、講義付箋を保持する', () => {
  const result = parseStep(step());
  assert.match(result.body[0], /\*\*本文\*\*/);
  assert.match(result.command, /## 要点\n```sh/);
  assert.equal(result.takeaway, '要点です。');
  assert.deepEqual(result.notes.map(note => note.showInPresentation), [false, true]);
  assert.equal(result.diagramState, 'stage');
  assert.throws(() => parseStep(step().replace('id: first', 'id: 不正'), 'example.md'), /example.md: id/);
  assert.throws(() => parseStep(step().replace('state: stage', 'state: stage\nstate: stage')), /設定が重複/);
  assert.throws(() => parseStep(step().replace('## 要点\n\n要点です。', '')), /本文と「## 要点」/);
  assert.throws(() => parseStep(step() + '\n```\n未完'), /コードブロックを閉じ/);
});

test('Chapterの数値順、SectionとStepの明示順、章をまたぐ同名Sectionを保持する', () => fixture(({ chapter, section, build }) => {
  const later = chapter('10-later', 'later', ['b', 'a']);
  section(later, 'a', 'shared');
  section(later, 'b', 'other', ['zulu.md', 'alpha.md']);
  section(chapter('02-first', 'first', ['a']), 'a', 'shared');
  const data = build();
  assert.equal(data.schemaVersion, 2);
  assert.deepEqual(data.chapters.map(item => item.id), ['first', 'later']);
  assert.deepEqual(data.chapters[1].sectionIds, ['other', 'shared']);
  assert.deepEqual(data.sections.map(item => item.route), ['first/shared', 'later/other', 'later/shared']);
  assert.deepEqual(data.sections[1].steps.map(item => item.id), ['zulu', 'alpha']);
}));

test('同一Chapter内のSection ID、同一Section内のStep ID、Chapter IDの重複を拒否する', () => fixture(({ chapter, section, build }) => {
  const c = chapter('00-example', 'example', ['a', 'b']);
  section(c, 'a', 'same');
  const b = section(c, 'b', 'same');
  assert.throws(build, /sectionのidが重複/);
  writeJSON(path.join(b, 'section.json'), { id: 'other', title: 'Other', diagram: {}, steps: ['first.md', 'duplicate.md'] });
  fs.writeFileSync(path.join(b, 'duplicate.md'), step());
  assert.throws(build, /stepのidが重複/);
  fs.writeFileSync(path.join(b, 'duplicate.md'), step('second'));
  section(chapter('01-again', 'example', ['a']), 'a', 'shared');
  assert.throws(build, /chapterのidが重複/);
}));

test('登録済みMarkdownの欠落、未登録下書き、README除外を区別する', () => fixture(({ chapter, section, warnings, build }) => {
  const location = section(chapter('00-example', 'example', ['a']), 'a', 'a');
  fs.writeFileSync(path.join(location, 'draft.md'), '未完成');
  fs.writeFileSync(path.join(location, 'README.md'), '執筆メモ');
  assert.equal(build().sections[0].steps.length, 1);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /draft.md: steps未登録/);
  fs.unlinkSync(path.join(location, 'first.md'));
  assert.throws(build, /見つかりません: first.md/);
}));

test('階層外へのChapter内Section名とSection内Step名、空・重複一覧を拒否する', () => fixture(({ chapter, section, build }) => {
  const c = chapter('00-example', 'example', ['a']);
  const s = section(c, 'a', 'a');
  const sectionMetadata = steps => writeJSON(path.join(s, 'section.json'), { id: 'a', title: 'A', diagram: {}, steps });
  for (const invalid of [undefined, [], 'a']) {
    writeJSON(path.join(c, 'chapter.json'), { id: 'example', title: 'Example', sections: invalid });
    assert.throws(build, /sectionsに名前の配列/);
  }
  for (const invalid of ['../outside', 'nested/file', 'nested\\file', '/absolute', 'C:\\outside', null]) {
    writeJSON(path.join(c, 'chapter.json'), { id: 'example', title: 'Example', sections: [invalid] });
    assert.throws(build, /直下の|文字列/);
  }
  writeJSON(path.join(c, 'chapter.json'), { id: 'example', title: 'Example', sections: ['a'] });
  for (const invalid of ['../outside.md', 'nested/file.md', 'nested\\file.md', '/absolute.md', 'C:\\outside.md', 'graph.json', null]) {
    sectionMetadata([invalid]);
    assert.throws(build, /直下の|文字列/);
  }
  for (const invalid of [undefined, [], 'first.md']) {
    sectionMetadata(invalid);
    assert.throws(build, /stepsに名前の配列/);
  }
  sectionMetadata(['first.md', 'FIRST.md']);
  assert.throws(build, /stepsの名前が重複/);
  writeJSON(path.join(c, 'chapter.json'), { id: 'example', title: 'Example', sections: ['a', 'A'] });
  assert.throws(build, /sectionsの名前が重複/);
}));

test('graphはcontent配下に限定し、redirectは既存Stepの完全なルートに限定する', () => fixture(({ directory, chapter, section, build }) => {
  const s = section(chapter('00-example', 'example', ['a']), 'a', 'a');
  fs.mkdirSync(path.join(directory, 'graphs'));
  const graph = { nodes: [], states: {} };
  writeJSON(path.join(directory, 'graphs', 'test.json'), graph);
  const configure = value => writeJSON(path.join(s, 'section.json'), { id: 'a', title: 'A', diagram: {}, steps: ['first.md'], graph: value });
  configure('graphs/test.json');
  assert.deepEqual(build().sections[0].graph, graph);
  for (const invalid of ['../outside.json', path.resolve(directory, '../outside.json')]) {
    configure(invalid);
    assert.throws(build, /graphはcontent内/);
  }
  configure('graphs/test.json');
  writeJSON(path.join(directory, 'course.json'), { redirects: { 'old/first': 'example/a/first' } });
  assert.equal(build().redirects['old/first'], 'example/a/first');
  for (const destination of ['example/a/missing', 'example/a', 'old/first']) {
    writeJSON(path.join(directory, 'course.json'), { redirects: { old: destination } });
    assert.throws(build, /転送先が存在しません/);
  }
}));

test('実教材は指定された5 ChapterとSection順を保つ', () => {
  const data = buildCourse({ output: null });
  const expected = {
    intro: ['preparation', 'conclusion'],
    solo: ['motivation', 'flow', 'essential', 'basic', 'practice', 'summary'],
    branches: ['internals', 'concepts', 'detached', 'summary'],
    collaboration: ['markdown', 'issues', 'hands-on', 'branch-commands'],
    tips: ['worktree', 'submodule', 'conflicts', 'data-loss', 'aliases', 'advanced', 'gh'],
  };
  assert.deepEqual(data.chapters.map(chapter => chapter.id), Object.keys(expected));
  for (const chapter of data.chapters) {
    assert.deepEqual(chapter.sectionIds, expected[chapter.id]);
    assert.deepEqual(data.sections.filter(section => section.chapterId === chapter.id).map(section => section.id), expected[chapter.id]);
  }
  const essential = data.sections.find(section => section.route === 'solo/essential');
  assert.deepEqual(essential.steps.map(step => step.id), ['clone', 'stage', 'commit', 'push', 'pull', 'status']);
  const basic = data.sections.find(section => section.route === 'solo/basic');
  const basicCommands = ['init', 'reset', 'clean', 'stash', 'merge-model', 'cherry-pick'];
  assert.deepEqual(basic.steps.map(step => step.id).filter(id => basicCommands.includes(id)), basicCommands);
  const standard = data.sections.find(section => section.route === 'collaboration/branch-commands');
  assert.deepEqual(standard.steps.map(step => step.id), ['branch', 'checkout-switch', 'rebase', 'restore-worktree', 'restore-index']);
  const advanced = data.sections.find(section => section.route === 'tips/advanced');
  assert.equal(advanced.steps.length, 12);
  assert.equal(data.sections.reduce((sum, section) => sum + section.steps.length, 0), 111);
  assert.equal(data.redirects['branch-commands/rebase/rebase'], 'collaboration/branch-commands/rebase');
  assert.equal(data.redirects['advanced/bisect/bisect-start'], 'tips/advanced/bisect-start');
  const routes = new Set(data.sections.flatMap(section => section.steps.map(step => `${section.route}/${step.id}`)));
  for (const destination of Object.values(data.redirects)) assert.ok(routes.has(destination), destination);
});
