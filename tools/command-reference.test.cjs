const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { buildCourse } = require('./build-content.cjs');
const root = path.resolve(__dirname, '..');
const models = JSON.parse(fs.readFileSync(path.join(root, 'content/command-diagrams.json'), 'utf8'));
// Coverage taken from the source PPT, including the user's clone/commit references.
const sourceOptions = {
  'essential-clone': [25, ['--recursive', '--depth', '-b <branch name>']],
  'essential-stage': [26, ['--all', '--update', '--patch']],
  'essential-commit': [27, ['--amend', '--verbose', 'feat:', 'fix:', 'update:']],
  'essential-push': [28, ['<local ref>:<remote ref>', '--set-upstream', '--force', '--force-with-lease']],
  'essential-status': [31, ['up to date', 'behind', 'ahead', 'Changes not staged for commit', 'Changes to be committed', 'Untracked', 'new file', 'modified', 'deleted']],
  'basic-reset': [34, ['--hard', '--mixed', '--soft', '<file path>']],
  'basic-clean': [35, ['--force', '--dry-run']],
  'basic-stash': [36, ['save', 'list', 'apply', 'pop', 'show', 'drop', 'clear', '-u', '-a']],
  'basic-merge-model': [37, ['-m', '--squash', '--ff', '--no-ff', '--ff-only']],
  'basic-cherry-pick': [38, ['--continue', '--abort']],
  'branch-commands-branch': [83, ['--all', '--remotes', '--delete', '-u']],
  'branch-commands-checkout-switch': [84, ['-b', '-c', '<commit ID>', '<file>']],
};
test('原資料の書式・オプションを左側の可視テキストに保持する', () => {
  for (const [id, [page, terms]] of Object.entries(sourceOptions)) {
    assert.ok(models[id].source.pptSlides.includes(page), `${id}: source page`);
    const svg = fs.readFileSync(path.join(root, 'docs/assets/commands', id + '.svg'), 'utf8');
    const visible = [...svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map(m => m[1])
      .join('').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
    for (const term of terms) assert.ok(visible.replace(/\s+/g, '').includes(term.replace(/\s+/g, '')), `${id}: missing visible ${term}`);
  }
});
test('全コマンドStepに参照資料を割り当て、原資料と補足の出典を区別する', () => {
  const data = buildCourse({ output: null });
  const steps = data.sections.flatMap(s => s.steps).filter(s => s.diagram?.src?.startsWith('assets/commands/'));
  assert.equal(steps.length, 30);
  for (const step of steps) {
    const id = path.basename(step.diagram.src, '.svg');
    const model = models[id];
    assert.ok(model, `${id}: missing reference`);
    assert.ok(model.syntax.length && model.paragraphs.length);
    assert.ok(['source-adaptation', 'source-extension', 'supplement'].includes(model.source.kind));
    if (model.source.kind !== 'supplement') assert.ok(model.source.pptSlides.length);
  }
  assert.equal(models['essential-stage'].figure, 'add');
  assert.equal(models['essential-pull'].figure, 'pull');
  assert.equal(models['branch-commands-rebase'].figure, 'rebase');
});
