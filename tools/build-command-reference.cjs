/* Source command slides, reconstructed with editable SVG text and diagrams. */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'), models=JSON.parse(fs.readFileSync(path.join(root,'content/command-diagrams.json'),'utf8'));
const output=path.join(root,'docs/assets/commands');fs.mkdirSync(output,{recursive:true});
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const units=s=>[...s].reduce((n,c)=>n+(/[ -~]/.test(c)?0.59:1),0);
function wrap(s,width,size){
  const result=[];
  for(const source of String(s).split('\n')){
    let line='';
    for(const token of source.match(/[A-Za-z0-9_./<>{}@^~:=+*\-]+|./gu)||[]){
      if(line&&units(line+token)*size>width){result.push(line.trimEnd());line='';}
      if(units(token)*size>width){
        for(const c of token){if(line&&units(line+c)*size>width){result.push(line);line='';}line+=c;}
      }else line+=token;
    }
    result.push(line.trimEnd());
  }
  return result;
}
const text=(x,y,s,size=24,cls='',anchor='start')=>`<text x="${x}" y="${y}" font-size="${size}" class="${cls}" text-anchor="${anchor}">${esc(s)}</text>`;
function block(x,y,s,width,size=24,cls=''){const lines=wrap(s,width,size),leading=Math.round(size*1.48);return {svg:lines.map((s,i)=>text(x,y+i*leading,s,size,cls)).join(''),height:lines.length*leading};}
function table(g,x,y,width){const out=[text(x,y,g.heading,25,'heading'),`<path d="M${x} ${y+13}h${width}" stroke="#868e8b"/>`];y+=36;const cw=width>700?345:205,gap=22;for(const [code,description]of g.rows){const a=block(x+12,y+25,code,cw-24,width>700?23:21,'mono'),b=block(x+cw+gap,y+25,description,width-cw-gap,23);out.push(`<rect x="${x}" y="${y}" width="${cw}" height="${a.height+13}" rx="4" fill="#f7f9f8"/>`,a.svg,b.svg);y+=Math.max(a.height,b.height)+26;}return {svg:out.join(''),y:y+20};}
function add(y){return {height:140,svg:`<g transform="translate(0 ${y})"><rect x="75" y="12" width="350" height="102" rx="6" fill="#f7f9f8"/><rect x="670" y="12" width="350" height="102" rx="6" fill="#f7f9f8"/>${text(250,46,'working tree',24,'heading','middle')}${text(250,88,'作業する場所：v2',23,'','middle')}${text(845,46,'index',24,'heading','middle')}${text(845,88,'記録候補：v1 から v2 へ',23,'','middle')}<path d="M445 74H645" class="arrow" marker-end="url(#arrow)"/>${text(545,52,'add',24,'mono','middle')}</g>`};}
function pull(y){const out=[`<g transform="translate(0 ${y})"><rect x="20" y="5" width="645" height="150" rx="6" fill="#f7f9f8"/>`,text(40,38,'リモート',24,'heading'),text(55,83,'repo. a',22),text(55,130,'repo. b',22),'<path d="M205 75H600 M205 97H560 M205 125H600" stroke="#5f6563" stroke-width="4"/>',text(610,80,'main',20),text(570,101,'develop',20),text(610,132,'main',20),'<rect x="20" y="183" width="645" height="232" rx="6" fill="#f7f9f8"/>',text(40,215,'ローカル',24,'heading')];['remote tracking branch','local branch','index','working tree','stash'].forEach((s,i)=>{const yy=247+i*33;out.push(text(45,yy,s,20),`<path d="M340 ${yy-7}H610" stroke="#5f6563" stroke-width="3"/>`);});out.push(text(475,240,'origin/main',20),text(550,274,'main',20),'<path d="M420 127V239" stroke="#0090ff" stroke-width="5" marker-end="url(#blue-arrow)"/>',text(444,183,'fetch',24,'mono'),'<path d="M540 241V273" stroke="#e54d2e" stroke-width="5" marker-end="url(#warm-arrow)"/>',text(585,291,'merge',23,'mono'),text(735,184,'リモート追跡ブランチを更新',23),text(735,292,'取得した内容を',23),text(735,326,'ローカルブランチへ統合',23),'<path d="M706 139V354" fill="none" stroke="#218358" stroke-width="2"/>',text(736,393,'pull は取得と統合',25,'heading'),'</g>');return {svg:out.join(''),height:445};}
function rebase(y){const out=[`<g transform="translate(0 ${y})">`],node=(x,yy,warm=false)=>`<circle cx="${x}" cy="${yy}" r="8" fill="${warm?'#e54d2e':'#30a46c'}"/>`,mark=(x,yy)=>`<rect x="${x-14}" y="${yy-14}" width="28" height="28" rx="5" fill="none" stroke="#0d74ce" stroke-width="2.5"/>`;
 out.push(text(35,25,'共通の出発点',24,'heading'),text(390,25,'rebase 後',24,'heading'),text(780,25,'merge 後',24,'heading'),'<path d="M40 180H245 M90 180L125 130H240" class="history"/>');
 [40,90,165,240].forEach(x=>out.push(node(x,180)));[125,180,235].forEach(x=>out.push(node(x,130,true)));out.push(mark(240,180),mark(235,130),text(250,185,'main',20),text(195,107,'feat/popup',20),'<path d="M340 180H385L420 130H660" class="history"/>');
 [340,385].forEach(x=>out.push(node(x,180)));[420,470,520].forEach(x=>out.push(node(x,130,true)));[590,655].forEach(x=>out.push(node(x,130)));out.push(mark(520,130),mark(655,130),text(478,107,'feat/popup',20),text(636,80,'main',20),'<path d="M745 180H1045 M795 180L830 130H925L1045 180" class="history"/>');
 [745,795,865,935,1045].forEach(x=>out.push(node(x,180)));[830,875,925].forEach(x=>out.push(node(x,130,true)));out.push(mark(925,130),mark(1045,180),text(875,107,'feat/popup',20),text(1040,216,'main',20),text(390,252,'main で実行',22),text(390,286,'git rebase feat/popup',22,'mono'),text(390,323,'元となるcommit（base）を変える',21),text(750,252,'同じ出発点の main で実行',22),text(750,286,'git merge feat/popup',22,'mono'),text(750,323,'feat/popup を HEAD に統合する',21),'</g>');return {svg:out.join(''),height:355};}
for(const [id,m]of Object.entries(models)){let y=30;const out=[];
 for(const s of m.syntax){const a=block(50,y+34,s,1000,27,'command');out.push(`<rect x="30" y="${y}" width="1040" height="${a.height+22}" rx="5" fill="#1a211e"/>`,a.svg);y+=a.height+34;}y+=15;
 for(const s of m.paragraphs){const a=block(44,y+24,s,1012);out.push(a.svg);y+=a.height+12;}
 if(m.figure){y+=15;const a={add,pull,rebase}[m.figure](y);out.push(a.svg);y+=a.height;}
 if(m.terminal){y+=16;const a=block(58,y+36,m.terminal.join('\n'),990,24,'mono');out.push(`<rect x="30" y="${y}" width="1040" height="${a.height+30}" rx="5" fill="#f7f9f8"/>`,a.svg);y+=a.height+55;}
 y+=24;
 if(m.columns){for(let i=0;i<m.groups.length;i+=2){const a=table(m.groups[i],35,y,500);out.push(a.svg);let end=a.y;if(m.groups[i+1]){const b=table(m.groups[i+1],570,y,500);out.push(b.svg);end=Math.max(end,b.y);}y=end;}}
 else for(const g of m.groups){const a=table(g,35,y,1030);out.push(a.svg);y=a.y;}
 if(m.footnote){const a=block(40,y+23,m.footnote,1020,21,'muted');out.push(a.svg);y+=a.height+25;}
 y=Math.max(y,360);
 const accessible=[...m.syntax,...m.paragraphs,...m.groups.flatMap(g=>[g.heading,...g.rows.map(r=>r.join('：'))]),m.footnote||''].join('。');
 const marker=(id,color)=>`<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${color}"/></marker>`;
 fs.writeFileSync(path.join(output,id+'.svg'),`<svg xmlns="http://www.w3.org/2000/svg" class="command-reference" viewBox="0 0 1100 ${y+55}" role="img" aria-labelledby="title desc"><title id="title">${esc(m.title)}：書式・説明・オプション</title><desc id="desc">${esc(accessible)}</desc><style>.command-reference {font-family:"Hiragino Sans","Noto Sans JP","Yu Gothic",Meiryo,sans-serif;fill:#1a211e;} .command-reference .heading {fill:#218358;font-weight:700;} .command-reference .mono,.command-reference .command {font-family:Consolas,monospace;} .command-reference .command {fill:#fff;} .command-reference .muted {fill:#5f6563;} .command-reference .arrow {fill:none;stroke:#218358;stroke-width:3;} .command-reference .history {fill:none;stroke:#868e8b;stroke-width:3;}</style><defs>${marker('arrow','#218358')}${marker('blue-arrow','#0090ff')}${marker('warm-arrow','#e54d2e')}</defs>${out.join('\n')}</svg>\n`);
}
console.log(`Generated ${Object.keys(models).length} source-based command reference cards.`);
