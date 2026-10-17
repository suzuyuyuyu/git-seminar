/* Vector illustrations for the additional course Steps; models live in content/. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const models = JSON.parse(fs.readFileSync(path.join(root, 'content/diagram-models.json'), 'utf8'));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const text = (x,y,value,cls='') => `<text x="${x}" y="${y}" class="${cls}">${escape(value)}</text>`;
const rect = (x,y,w,h,cls='card') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" class="${cls}"/>`;
function wrap(value, limit) {
  const result=[];let line='',width=0;
  for(const char of value) {
    const advance=/[\u0020-\u007e]/.test(char)?1:2;
    if(width+advance>limit){result.push(line);line='';width=0;}
    line+=char;width+=advance;
  }
  if(line)result.push(line);
  return result;
}
const paragraphs=(x,y,value,limit,cls='',leading=36)=>wrap(value,limit).map((s,i)=>text(x,y+i*leading,s,cls)).join('');
const circle=(x,y,label,cls='')=>`<circle cx="${x}" cy="${y}" r="14" class="commit ${cls}"/>${text(x-58,y+8,label,'small mono')}`;
const edge=d=>`<path d="${d}" class="edge"/>`;
function reachability(){
  const graph=(x,all)=>edge(`M${x} 480 V220 M${x} 400 L${x+170} 340 V255`)+
    [480,400,310,220].map((y,i)=>circle(x,y,`c${i+1}`)).join('')+
    circle(x+170,340,'f1',all?'':'faded')+circle(x+170,255,'f2',all?'':'faded')+
    `<rect x="${x-24}" y="196" width="48" height="48" rx="5" class="reference"/>`+
    text(x+38,229,'main / HEAD','small strong')+`<rect x="${x+146}" y="231" width="48" height="48" rx="5" class="reference"/>`+text(x+205,264,'feature','small blue')+
    (!all?text(x+95,462,'HEADからは未到達','tiny muted'):text(x+95,462,'featureから到達','tiny blue'));
  return text(52,154,'通常のlog：HEADから','strong')+text(620,154,'--all：ほかの参照も含む','strong')+
    graph(155,false)+graph(720,true);
}
function flow(){
  const areas=[['working tree','編集するファイル'],['index','次の記録の内容'],['local repo.','手元の履歴'],['remote repo.','共有先の履歴']];
  return areas.map(([name,description],i)=>{
    const x=40+i*270;
    return rect(x,195,230,225)+text(x+18,250,name,'mono strong small')+paragraphs(x+18,305,description,16,'small')+
      (i<3?`<path class="action" d="M${x+234} 370 h30 m-8 -6 l8 6 l-8 6"/>`+text(x+205,460,['add','commit','push'][i],'small mono'): '');
  }).join('');
}
let drawings='';
for(const [state,model] of Object.entries(models)){
  const title=paragraphs(36,50,model.title,66,'heading',42);
  const body=state==='branches-summary-reachable'?reachability():state==='solo-flow-simple-flow'?flow():
    model.cards.map((card,i)=>{
      const x=40+i*360;
      let y=290;
      const lines=card.lines.map(s=>{const chunks=wrap(s,23),result=chunks.map((s,j)=>text(x+24,y+j*34,s,'small')).join('');y+=chunks.length*34+14;return result;}).join('');
      if(y>485)throw new Error(`Diagram card is too tall: ${state}/${card.title}`);
      return rect(x,170,320,340,i===2?'card blue-card':'card')+paragraphs(x+24,220,card.title,20,'strong',36)+lines;
    }).join('');
  drawings+=`<g data-state="${escape(state)}">${title}${body}<path d="M36 552 H1084" class="divider"/>${paragraphs(36,588,model.footer||model.takeaway,94,'footer',28)}</g>\n`;
}
const states=Object.keys(models), selectors=states.map(s=>`svg.curriculum-guide[data-current-state="${s}"] > g[data-state="${s}"]`).join(',\n');
const result=`<svg xmlns="http://www.w3.org/2000/svg" class="curriculum-guide" viewBox="0 0 1120 630" role="img" aria-labelledby="curriculum-title curriculum-desc" data-current-state="${states[0]}">
<title id="curriculum-title">Git教材の追加説明図</title>
<desc id="curriculum-desc">現在のStepに対応する説明図です。3つの枠で対象や操作の違いを整理します。4領域の流れではadd・commit・pushを、履歴図ではHEADとほかの参照から到達するcommitの違いを示します。丸はcommit、実線は親子関係です。</desc>
<style><![CDATA[
svg.curriculum-guide {background:#fbfcf9;font-family:"Noto Sans JP","Yu Gothic",Meiryo,sans-serif;}
svg.curriculum-guide text {fill:#24352e;font-size:28px;white-space:pre;}
svg.curriculum-guide .heading {font-size:30px;font-weight:700;}
svg.curriculum-guide .strong {fill:#31664b;font-weight:700;}
svg.curriculum-guide .small {font-size:24px;}
svg.curriculum-guide .tiny {font-size:21px;}
svg.curriculum-guide .footer {font-size:22px;}
svg.curriculum-guide .mono {font-family:Consolas,monospace;}
svg.curriculum-guide .muted {fill:#65736a;}
svg.curriculum-guide .blue {fill:#486d9b;}
svg.curriculum-guide .card {fill:#edf3eb;stroke:#c4d3c5;stroke-width:2;}
svg.curriculum-guide .blue-card {fill:#eef2f8;stroke:#a7bad4;}
svg.curriculum-guide .divider {fill:none;stroke:#d8dfd6;stroke-width:1.5;}
svg.curriculum-guide .edge {fill:none;stroke:#a2ada5;stroke-width:3;}
svg.curriculum-guide .action {fill:none;stroke:#31664b;stroke-width:2.5;}
svg.curriculum-guide .commit {fill:#6f9e78;stroke:#31664b;stroke-width:2;}
svg.curriculum-guide .faded {fill:#f1f3f0;stroke:#b9c2ba;stroke-dasharray:3 3;}
svg.curriculum-guide .reference {fill:none;stroke:#31664b;stroke-width:2.5;}
svg.curriculum-guide > g[data-state] {display:none;}
${selectors} {display:block;}
]]></style>
${drawings}</svg>\n`;
fs.writeFileSync(path.join(root,'docs/assets/curriculum-guide.svg'),result);
console.log(`Built curriculum-guide.svg (${states.length} states)`);
