/* Shared vector primitives keep before/after histories aligned. No raster assets. */
const fs = require('node:fs');
const path = require('node:path');
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const text = (x, y, value, cls = '', anchor = 'start') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`;
const line = (d, cls = 'link') => `<path class="${cls}" d="${d}"/>`;
const rect = (x, y, w, h, cls = 'card') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" class="${cls}"/>`;
const node = (x, y, id = '', cls = '') => `<circle class="commit ${cls}" cx="${x}" cy="${y}" r="13"/>${id ? text(x - 28, y + 8, id, 'mono small', 'end') : ''}`;
const frame = (x, y, h = 44, cls = 'marker') => `<rect class="${cls}" x="${x - 22}" y="${y - 22}" width="44" height="${h}" rx="5"/>`;
const pointer = (x, y, label, width = 126, cls = '') => frame(x, y) + line(`M${x + 22} ${y} H${x + 42}`, 'ref') + rect(x + 42, y - 20, width, 40, `label-box ${cls}`) + text(x + 54, y + 8, label, `strong ${cls}`);
const head = (x, y, targetY) => text(x, y, 'HEAD', 'red strong') + line(`M${x + 35} ${y + 8} V${targetY - 6} m-5 -7 l5 7 l5 -7`, 'head-arrow');
const arrow = (x1, y, x2) => {
  const back = x2 > x1 ? -9 : 9;
  return line(`M${x1} ${y} H${x2} m${back} -7 l${-back} 7 l${back} 7`, 'arrow');
};
const group = (state, title, body, footer) => `<g data-state="${state}">\n${text(36, 50, title, 'heading')}\n${body}\n${line('M36 557 H1084', 'divider')}${text(36, 600, footer, 'small')}\n</g>`;
const panelTitle = (x, title, sub = '') => text(x, 110, title, 'strong') + (sub ? text(x, 145, sub, 'small muted') : '');
const chain = (x, rows) => line(`M${x} ${rows.at(-1)[0]} V${rows[0][0]}`) + rows.map(([y, id]) => node(x, y, id)).join('');
function svg(name, title, description, states) {
  const selectors = Object.keys(states).map(state => `svg.${name}[data-current-state="${state}"] > g[data-state="${state}"]`).join(',\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" class="${name}" viewBox="0 0 1120 630" role="img" aria-labelledby="${name}-title ${name}-desc" data-current-state="${Object.keys(states)[0]}">
<title id="${name}-title">${esc(title)}</title>
<desc id="${name}-desc">${esc(description)}</desc>
<style><![CDATA[
svg.${name} {background:#fbfcf9;font-family:"Noto Sans JP","Yu Gothic",Meiryo,sans-serif;}
svg.${name} text {fill:#24352e;font-size:28px;white-space:pre;}
svg.${name} .heading {font-size:32px;font-weight:700;}
svg.${name} .strong {fill:#31664b;font-weight:700;}
svg.${name} .small {font-size:24px;}
svg.${name} .tiny {font-size:21px;}
svg.${name} .mono {font-family:Consolas,"Yu Gothic",monospace;}
svg.${name} .muted {fill:#65736a;}
svg.${name} .red {fill:#a74238;}
svg.${name} .blue {fill:#486d9b;}
svg.${name} .link {fill:none;stroke:#a2ada5;stroke-width:3;}
svg.${name} .divider {fill:none;stroke:#d8dfd6;stroke-width:1.5;}
svg.${name} .arrow, svg.${name} .ref {fill:none;stroke:#31664b;stroke-width:2.5;}
svg.${name} .head-arrow {fill:none;stroke:#a74238;stroke-width:2.5;}
svg.${name} .commit {fill:#6f9e78;stroke:#31664b;stroke-width:2;}
svg.${name} .incoming {fill:#b5c8df;stroke:#486d9b;}
svg.${name} .marker {fill:none;stroke:#31664b;stroke-width:2.5;}
svg.${name} .wrong {fill:#f1d5ce;fill-opacity:.5;stroke:#a74238;stroke-width:2;}
svg.${name} .card {fill:#edf3eb;stroke:#c4d3c5;stroke-width:2;}
svg.${name} .label-box {fill:#e6f0e7;stroke:#b4c8b7;stroke-width:1.5;}
svg.${name} .blue-card {fill:#eef2f8;stroke:#a7bad4;stroke-width:2;}
svg.${name} .note {fill:#f5eac8;stroke:#dfd2a4;stroke-width:1.5;}
svg.${name} .planned {fill:#f5eac8;stroke:#b59842;stroke-width:2.5;stroke-dasharray:7 6;}
svg.${name} .planned-link {fill:none;stroke:#b59842;stroke-width:2.5;stroke-dasharray:7 6;}
svg.${name} .terminal {fill:#303d35;}
svg.${name} .terminal-text {fill:#faf9f4;font-family:Consolas,"Yu Gothic",monospace;font-size:24px;}
svg.${name} .terminal-error {fill:#ffcfb3;font-family:Consolas,monospace;font-size:24px;}
svg.${name} > g[data-state] {display:none;}
${selectors} {display:block;}
]]></style>
${Object.values(states).join('\n')}
</svg>\n`;
}

const branches = {};
branches.dotgit = group('dotgit', '.git：作業ファイルと管理情報を分ける',
  rect(40, 100, 400, 414) + text(68, 145, '作業フォルダ', 'strong') +
  `<image x="66" y="180" width="70" height="70" href="illustrations/folder.svg"/>` + text(160, 225, '.git', 'strong') +
  line('M100 270 V455 M100 310 H150 M100 375 H150 M100 440 H150') +
  text(165, 320, 'README.md', 'mono') + text(165, 385, 'hello.py', 'mono') + text(165, 450, '…', 'muted') +
  arrow(460, 225, 580) + text(474, 195, '中を見る', 'small') +
  rect(604, 100, 476, 414) + text(632, 145, 'Gitが管理する情報', 'strong') +
  text(632, 218, 'objects', 'mono strong') + text(632, 257, 'commit・スナップショット', 'small') +
  text(632, 319, 'refs / HEAD', 'mono strong') + text(632, 358, 'branchの目印・現在地', 'small') +
  text(632, 420, 'config', 'mono strong') + text(632, 459, '共有先などの設定', 'small'),
  '作業ファイルを編集し、Gitの操作で .git 内の履歴や目印を更新する。');

branches['commit-change'] = group('commit-change', 'commitすると、現在のbranchの目印が進む',
  panelTitle(64, '前：main → c3') + panelTitle(620, '後：main → c4') + line('M560 90 V520', 'divider') +
  chain(150, [[270, 'c3'], [370, 'c2'], [470, 'c1']]) + pointer(150, 270, 'main') + head(245, 190, 250) +
  chain(710, [[200, 'c4'], [270, 'c3'], [370, 'c2'], [470, 'c1']]) + pointer(710, 200, 'main') + head(805, 140, 180) +
  arrow(450, 350, 620) + text(535, 310, 'add', 'mono small', 'middle') + text(535, 400, 'commit', 'mono small', 'middle') +
  text(810, 310, 'c4を新しく作成', 'strong') + text(810, 355, 'c4の親はc3', 'small') + text(810, 430, 'HEAD → main', 'red strong'),
  'c1〜c3は同じ記録のまま。HEADはmainを指し続け、mainがc4へ移動する。');

branches.head = group('head', 'HEAD：branchを介して指す場合と、直接指す場合',
  panelTitle(64, '通常：HEAD → main → c4') + panelTitle(600, 'detached：HEAD → c2') + line('M560 90 V520', 'divider') +
  chain(150, [[210, 'c4'], [300, 'c3'], [390, 'c2'], [480, 'c1']]) + pointer(150, 210, 'main') + head(245, 140, 190) +
  chain(710, [[210, 'c4'], [300, 'c3'], [390, 'c2'], [480, 'c1']]) + pointer(710, 210, 'main') +
  text(806, 399, 'HEAD', 'red strong') + line('M794 390 H735 m7 -5 l-7 5 l7 5', 'head-arrow') +
  text(806, 460, '過去のcommitを見る', 'small') + text(806, 500, 'mainはc4のまま', 'small'),
  '右は過去の1例。どちらも同じ履歴で、HEADの参照先だけが異なる。');

branches['branch-growth'] = group('branch-growth', '別々にcommitすると、それぞれのbranchが進む',
  panelTitle(50, '前') + panelTitle(620, '後') + line('M560 90 V520', 'divider') +
  chain(145, [[320, 'm3'], [400, 'm2'], [480, 'm1']]) + line('M145 400 L350 360') + node(350, 360, 'b1', 'incoming') +
  frame(145, 320) + text(145, 275, 'main', 'strong', 'middle') + frame(350, 360) + text(350, 305, 'add/new-algorithm', 'small blue', 'middle') +
  chain(710, [[160, 'm5'], [240, 'm4'], [320, 'm3'], [400, 'm2'], [480, 'm1']]) +
  line('M710 400 L930 360 V200') + [360, 280, 200].map((y, i) => node(930, y, `b${i + 1}`, 'incoming')).join('') +
  frame(710, 160) + text(710, 115, 'main', 'strong', 'middle') + frame(930, 200) + text(930, 155, 'add/new-algorithm', 'small blue', 'middle') + arrow(480, 380, 610),
  '上下で時間が進む。前後で既存commitの高さを揃えた比較。HEADは省略。');

function misconception(x, merged, wrong) {
  const a = x + 95, b = x + 275, top = merged ? 390 : 180, base = merged ? 510 : 300;
  const step = merged ? 30 : 40;
  return line(`M${a} ${base} V${top} M${a} ${base - step} L${b} ${base - 25} V${base - 65}${merged ? ` M${a} ${top + step} L${b} ${base - 65}` : ''}`) +
    frame(a, top, wrong ? base - top + 44 : 44, wrong ? 'wrong' : 'marker') +
    frame(b, base - 65, wrong ? 84 : 44, wrong ? 'wrong' : 'marker') +
    Array.from({ length: merged ? 5 : 4 }, (_, i) => node(a, base - i * step)).join('') + node(b, base - 25) + node(b, base - 65) +
    text(a, top - 35, 'main', 'small strong', 'middle') + text(b, base - 100, 'branch', 'small strong', 'middle');
}
branches.misconception = group('misconception', 'branchは「線全体」ではなく、一つのcommitへの目印',
  text(55, 105, '× 履歴をまとめて囲む', 'red strong') + text(620, 105, '○ 先端の1commitを指す', 'strong') +
  line('M560 90 V535', 'divider') + misconception(65, false, true) + misconception(65, true, true) + misconception(630, false, false) + misconception(630, true, false) +
  text(450, 235, '分岐時', 'tiny muted') + text(450, 445, 'merge後', 'tiny muted') + text(1010, 435, 'merge', 'tiny muted'),
  '左右は同じ丸・同じ親子関係。違うのは、branchの四角が指す範囲だけ。');

branches.summary = group('summary', 'commit・branch・HEADの役割を分ける',
  rect(40, 105, 1040, 110) + node(95, 160) + text(140, 150, 'commit', 'strong') + text(410, 170, '内容のスナップショットと親の情報') +
  rect(40, 235, 1040, 110) + node(95, 290) + frame(95, 290) + text(140, 280, 'branch', 'strong') + text(410, 300, '一つのcommitを指す名前。commitで進む') +
  rect(40, 365, 1040, 150) + text(70, 425, 'HEAD', 'red strong') + arrow(175, 416, 240) + text(265, 425, 'main', 'strong') + arrow(355, 416, 410) + node(455, 416) +
  text(555, 423, '通常はbranchを介して現在地を示す', 'small') + text(555, 480, 'detached HEADはcommitを直接指す', 'small'),
  'tagもcommitへの目印。ただし、新しいcommitを作っても自動では進まない。');

branches.create = group('create', 'branchを作っても、現在地は変わらない',
  panelTitle(50, '作成前') + panelTitle(620, '作成後') + line('M560 90 V520', 'divider') +
  chain(150, [[250, 'c3'], [340, 'c2'], [430, 'c1']]) + pointer(150, 250, 'main') + head(245, 175, 230) +
  chain(710, [[250, 'c3'], [340, 'c2'], [430, 'c1']]) + pointer(710, 250, 'main') + head(805, 175, 230) +
  line('M732 250 H746 V315 H752', 'ref') + rect(752, 295, 252, 40, 'label-box') + text(764, 323, 'feature/name', 'strong') +
  arrow(460, 355, 610) + text(45, 505, 'git branch feature/name', 'mono small') + text(620, 505, '2つの名前が、同じc3を指す', 'small'),
  'git branchの * は現在のbranch。切り替える操作は git switch feature/name。');

function prHistory(x, merged) {
  return chain(x, [[320, 'c3'], [400, 'c2'], [480, 'c1']]) + line(`M${x} 400 L${x + 205} 440 V360`) +
    node(x + 205, 440, 'b1', 'incoming') + node(x + 205, 360, 'b2', 'incoming') + frame(x + 205, 360) +
    text(x + 205, 310, 'feature/name', 'small blue', 'middle') +
    (merged ? line(`M${x} 320 V230 L${x + 205} 360`) + node(x, 230, 'M') + frame(x, 230) : frame(x, 320)) +
    text(x + 60, 175, 'origin/main', 'small strong') + line(`M${x + 65} 185 L${x + 10} ${merged ? 207 : 297}`, 'ref') +
    text(x + 60, 120, 'origin/HEAD', 'small red') + line(`M${x + 135} 128 V145 m-5 -7 l5 7 l5 -7`, 'head-arrow');
}
branches['push-pr'] = group('push-pr', 'PRを提案し、共有先でmergeした結果を比べる',
  text(50, 105, 'PR作成時', 'strong') + text(615, 105, 'merge後', 'strong') + line('M560 90 V520', 'divider') +
  prHistory(150, false) + prHistory(715, true) + arrow(475, 350, 610) + text(615, 520, 'Mの親はc3とb2', 'small'),
  'origin/* はfetch後の手元の参照。共有先でmergeしても、手元のmainは自動で進まない。');

fs.writeFileSync(path.join(__dirname, '../docs/assets/branch-model.svg'), svg('branch-model', 'Gitの管理構造とブランチの読み方',
  '上ほど新しいcommit。丸は記録、実線は親子関係、四角は一つのcommitを指すbranch。緑の矢印は操作や参照、赤い矢印はHEADの参照先。前後の図で同じcommitの位置を揃えています。現在の節の図だけを表示します。', branches));

const integration = {};
const codeCard = (x, y, w, title, greeting, cls = 'card') => rect(x, y, w, 145, cls) +
  text(x + 22, y + 35, title, 'strong') + text(x + 22, y + 77, 'def greet():', 'mono small') +
  text(x + 22, y + 117, `    print("${greeting}")`, 'mono small');
const processCard = (x, y, w, title, lines, cls = 'card') => rect(x, y, w, 170, cls) +
  text(x + 24, y + 42, title, 'strong') + lines.map((s, i) => text(x + 24, y + 90 + i * 38, s, 'small')).join('');

integration.publish = group('publish', 'pushで共有してから、PRで統合を提案する',
  processCard(40, 165, 425, '手元：feature/name', ['commitした変更', 'mainへの統合は、まだ先']) +
  arrow(490, 250, 610) + text(550, 210, 'push', 'mono', 'middle') +
  processCard(645, 165, 435, '共有先：feature/name', ['同じcommitを送る', 'GitHubでPRを作る']) +
  rect(40, 405, 1040, 105, 'note') + text(68, 450, 'PRに書くこと', 'strong') + text(340, 468, '目的・関連Issue・変更点・確認結果', 'small'),
  'pushはbranchの共有。PRは、その変更をmainへ取り込むための提案。');

integration.review = group('review', 'PRでは、取り込み先・変更元・差分を確認する',
  processCard(40, 125, 430, 'base：取り込み先', ['main', 'ここへ変更を取り込む']) +
  processCard(650, 125, 430, 'compare：変更元', ['feature/name', 'このbranchの変更を提案']) +
  arrow(620, 210, 500) + text(560, 170, '統合', 'small', 'middle') +
  rect(40, 365, 1040, 150) + text(70, 410, '目的・差分・動作をレビュー', 'strong') +
  text(70, 459, '修正があれば同じbranchでcommit → push。確認してからmainへmerge。', 'small'),
  'レビュー中の修正も同じPRに反映される。baseとcompareの向きを確かめる。');

integration.sync = group('sync', '共有先での統合後、手元のmainを更新する',
  processCard(40, 165, 425, '共有先：main', ['PRの変更が統合済み', '手元はまだ更新されていない']) +
  arrow(490, 250, 610) + text(550, 205, 'pull', 'mono', 'middle') +
  processCard(645, 165, 435, '手元：main', ['前へ進められる場合だけ更新', '履歴が分岐していたら停止']) +
  rect(40, 405, 1040, 105) + text(68, 450, 'git switch main', 'mono small') + text(560, 450, 'git pull --ff-only', 'mono small'),
  'pullはfetchも行う。origin/mainは、fetchで取得した共有先mainの位置を表す。');

integration['conflict-setup'] = group('conflict-setup', '別フォルダで、同じ行を別々に変更してみる',
  codeCard(285, 90, 550, '共通のcommit：hello.py', 'Hello, world!') +
  line('M410 240 L280 285 M710 240 L840 285', 'arrow') +
  codeCard(40, 300, 500, 'mainで変更 → commit', 'Hello, everyone!') +
  codeCard(580, 300, 500, 'feat/jaで変更 → commit', 'こんにちは!', 'blue-card') +
  text(560, 505, '実習の順序：feat/jaでcommit → mainへ戻ってcommit', 'small', 'middle'),
  '既存の共有リポジトリと分けた、ローカル専用の練習用フォルダで再現する。');

function conflictHistory(x, advanced) {
  return chain(x, [[320, 'C1'], [400, 'c2'], [480, 'c1']]) + line(`M${x} 320 L${x + 215} 270`) + node(x + 215, 270, 'F1', 'incoming') +
    frame(x + 215, 270) + text(x + 215, 223, 'feat/ja', 'strong blue', 'middle') +
    (advanced ? line(`M${x} 320 V210`) + node(x, 210, 'M1') + frame(x, 210) + text(x, 165, 'main', 'strong', 'middle') : frame(x, 320) + text(x, 275, 'main', 'strong', 'middle'));
}
integration['conflict-history'] = group('conflict-history', '作業branchが分かれた後、mainも進んだ',
  panelTitle(50, '前：分岐した時点') + panelTitle(615, '後：mainにもcommitを追加') +
  line('M560 90 V520', 'divider') + conflictHistory(145, false) + conflictHistory(710, true) + arrow(475, 370, 610),
  '左右のC1とF1は同じ記録。mainがC1からM1へ進み、両方に固有の変更がある。');

integration.diverge = group('diverge', '共通のコードから、同じ行を別々に変更した',
  codeCard(285, 80, 550, '共通：C1', 'Hello, world!') +
  line('M410 230 L280 270 M710 230 L840 270', 'arrow') +
  codeCard(40, 275, 500, 'main：M1', 'Hello, everyone!') +
  codeCard(580, 275, 500, 'feat/ja：F1', 'こんにちは!', 'blue-card') +
  line('M360 465 L560 525 L760 465') + node(560, 525, 'C1') + node(360, 465, 'M1') + node(760, 465, 'F1', 'incoming') + frame(360, 465) + frame(760, 465) +
  text(270, 474, 'main', 'small strong', 'end') + text(810, 474, 'feat/ja', 'small blue strong'),
  '両方が同じ行を変更。どんな挨拶を完成形にするかは、人が決める。');

integration['conflict-choice'] = group('conflict-choice', 'mainへmergeしたい。でも、完成形を自動で決められない',
  codeCard(40, 95, 500, 'main：M1', 'Hello, everyone!') +
  codeCard(580, 95, 500, 'feat/ja：F1', 'こんにちは!', 'blue-card') +
  line('M360 370 L560 485 L760 370') + node(560, 485, 'C1') + node(360, 370, 'M1') + node(760, 370, 'F1', 'incoming') + frame(360, 370) + frame(760, 370) +
  line('M360 370 V285 L760 370', 'planned-link') + `<circle class="planned" cx="360" cy="285" r="15"/>` +
  text(403, 292, '予定のmerge commit（まだ存在しない）', 'small') +
  text(270, 379, 'main', 'small strong', 'end') + text(810, 379, 'feat/ja', 'small blue strong') +
  text(80, 505, 'HEAD → main', 'small red') + text(610, 525, 'git merge feat/ja', 'mono small'),
  '点線は予定。競合した段階では新しいcommitは作られず、mainの目印も進まない。');

integration['conflict-merge'] = group('conflict-merge', 'mergeは競合で停止する。履歴の統合は、まだ完了しない',
  rect(40, 110, 1040, 300, 'terminal') +
  text(68, 160, '(main) > git merge feat/ja', 'terminal-text') + text(68, 215, 'Auto-merging hello.py', 'terminal-text') +
  text(68, 270, 'CONFLICT (content): Merge conflict in hello.py', 'terminal-error') +
  text(68, 325, 'Automatic merge failed; fix conflicts and then', 'terminal-text') + text(68, 365, 'commit the result.', 'terminal-text') +
  text(70, 475, 'mainの先端はM1のまま', 'strong') + text(610, 475, '次はhello.pyを開いて確認', 'strong'),
  'Gitが競合箇所にマーカーを入れる。編集・確認・add・commitをして統合を完了する。');

integration.markers = group('markers', 'hello.py：マーカーの間に、双方の変更が並ぶ',
  rect(40, 100, 720, 420) + text(65, 145, 'def greet():', 'mono') +
  rect(55, 165, 690, 120, 'card') + text(75, 205, '<<<<<<< HEAD', 'mono small strong') + text(75, 255, '    print("Hello, everyone!")', 'mono small') +
  text(75, 325, '=======', 'mono small muted') +
  rect(55, 345, 690, 120, 'blue-card') + text(75, 390, '    print("こんにちは!")', 'mono small') + text(75, 440, '>>>>>>> feat/ja', 'mono small blue') +
  text(800, 205, '現在のmain側', 'strong') + text(800, 250, 'HEAD → main', 'red small') +
  text(800, 390, '取り込む側', 'blue strong') + text(800, 435, 'feat/ja', 'mono small'),
  'マーカーは未解決箇所の印。完成形を残し、<<<<<<<・=======・>>>>>>>を削除する。');

integration.resolve = group('resolve', '双方の意図を読んで、完成形を編集する',
  processCard(40, 100, 500, 'mainの変更', ['Hello, everyone!', 'みんなへの挨拶にする']) +
  processCard(580, 100, 500, 'feat/jaの変更', ['こんにちは!', '日本語で挨拶する'], 'blue-card') +
  line('M290 285 V315 H560 V340 M830 285 V315 H560', 'arrow') +
  codeCard(210, 365, 700, '完成形の例：hello.py', 'みなさんこんにちは!'),
  'マーカーを消す → greet()を実行して確認 → git add hello.py → git commit。');

integration.record = group('record', '解消した内容を、2つの親を持つcommitに記録する',
  chain(150, [[210, 'M2'], [340, 'M1'], [480, 'C1']]) + line('M150 480 L400 370 L150 210') + node(400, 370, 'F1', 'incoming') +
  pointer(150, 210, 'main') + head(245, 145, 190) + frame(400, 370) + text(400, 320, 'feat/ja', 'strong blue', 'middle') +
  text(40, 300, '親1', 'small muted') + text(315, 260, '親2', 'small blue') +
  codeCard(575, 120, 505, 'M2に保存する完成形', 'みなさんこんにちは!') +
  text(575, 335, 'M2の第一親：M1（main側）', 'small') + text(575, 385, 'M2の第二親：F1（取り込む側）', 'small') +
  text(575, 460, 'main → M2', 'strong') + text(575, 505, 'feat/ja → F1 のまま', 'blue small'),
  'merge commitが作られ、HEADが指すmainがM2へ進む。既存のM1・F1は書き換わらない。');

integration.alternatives = group('alternatives', '途中で中止する方法と、GitHubでの解消',
  processCard(40, 130, 500, '手元で中止する', ['git merge --abort', 'merge開始前の状態へ戻す']) +
  processCard(580, 130, 500, 'GitHubで解消する', ['単純な競合に対応', 'baseをhead側へ取り込む'], 'blue-card') +
  rect(40, 385, 1040, 130, 'note') + text(68, 435, 'GitHubで競合を解消した場合も', 'strong') +
  text(68, 480, 'PRの差分や動作を確認し、取り込み先への統合を完了する。', 'small'),
  '競合の解消は、完成形を決める作業。PRのレビューと統合も続けて確認する。');

fs.writeFileSync(path.join(__dirname, '../docs/assets/collaboration-integration.svg'), svg('collaboration-integration', '変更の統合と競合解消',
  '共通のコードから二つの変更が分かれ、競合を編集してからmerge commitを作る過程を示します。丸はcommit、実線は親子関係、四角はbranch。青は取り込む側を識別します。点線のcommitは未作成の予定であり、競合停止中にmainは進みません。現在の節の図だけを表示します。', integration));

console.log(`Built branch-model.svg (${Object.keys(branches).length} states), collaboration-integration.svg (${Object.keys(integration).length} states)`);
