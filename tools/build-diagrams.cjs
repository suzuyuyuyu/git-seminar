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
const arrow = (x1, y, x2) => line(`M${x1} ${y} H${x2} m-9 -7 l9 7 l-9 7`, 'arrow');
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

console.log(`Built branch-model.svg (${Object.keys(branches).length} states)`);
