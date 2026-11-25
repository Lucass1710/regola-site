/* ---------- data ---------- */
const PAL=[
  ['Nero Notte','#141414'],['Bianco Latte','#eeeae2'],['Grigio Pietra','#7a7c7e'],['Sabbia','#d8c7a3'],
  ['Rosso Corsa','#a3141e'],['Barolo','#5e1020'],['Arancio','#d45a26'],['Oro','#c9a96e'],
  ['Azzurro Monviso','#3f86c0'],['Blu Notte','#1b2a4a'],['Verde Langhe','#2e4b3b'],['Salvia','#9aae98'],
  ['Lavanda','#8c7bc6'],['Viola','#4b2a6b'],['Rosa Cipria','#d9a7a7']
];
const MODELS={
  C01:{type:'Route · Course',w:{tt:21,ht:32,dt:30,st:24,cs:15,ss:13,fk:21},tire:12,rim:34},
  DARDO:{type:'Course · Aéro',w:{tt:23,ht:36,dt:38,st:28,cs:16,ss:13,fk:24},tire:12,rim:48},
  GEIRA:{type:'Gravel · Aventure',w:{tt:20,ht:30,dt:29,st:23,cs:15,ss:12,fk:21},tire:26,rim:14}
};
const MOTIFS=[['solid','Uni'],['fade','Dégradé'],['split','Bicolore'],['marble','Marbré'],['check','Damier']];
const FINISH=[['gloss','Brillant'],['matte','Mat'],['metal','Métallisé'],['iris','Caméléon']];
const PRESETS=[
  {n:'Viola Sfumato',model:'DARDO',motif:'fade',p:'#8c7bc6',s:'#eeeae2',a:'#141414',f:'gloss'},
  {n:'Rosso Marmo',model:'C01',motif:'marble',p:'#a3141e',s:'#141414',a:'#eeeae2',f:'gloss'},
  {n:'Scacchi',model:'GEIRA',motif:'check',p:'#eeeae2',s:'#8c7bc6',a:'#141414',f:'matte'},
  {n:'Notte d\'Oro',model:'C01',motif:'solid',p:'#141414',s:'#141414',a:'#c9a96e',f:'matte'},
  {n:'Ghiacciaio',model:'DARDO',motif:'fade',p:'#eeeae2',s:'#3f86c0',a:'#141414',f:'metal'},
  {n:'Langhe',model:'GEIRA',motif:'split',p:'#2e4b3b',s:'#d8c7a3',a:'#c9a96e',f:'matte'},
  {n:'Squadra Azzurra',model:'C01',motif:'solid',p:'#3f86c0',s:'#3f86c0',a:'#eeeae2',f:'gloss',tri:'both'}
];
const TRI=[['none','Aucune'],['seat','Tube de selle'],['top','Tube supérieur'],['both','Les deux']];
const S={model:'C01',motif:'fade',p:'#8c7bc6',s:'#eeeae2',a:'#c9a96e',f:'gloss',tri:'none',name:'',tab:'p'};
const nameOf=h=>(PAL.find(x=>x[1].toLowerCase()===h.toLowerCase())||[t('Sur mesure')])[0];
const $=id=>document.getElementById(id);

const NS='http://www.w3.org/2000/svg';

/* ---------- wheels ---------- */
function drawWheels(){
  const m=MODELS[S.model],g=$('wheels');g.innerHTML='';
  [[240,432,'rimTxtR'],[760,432,'rimTxtF']].forEach(([cx,cy,tp])=>{
    const R=165, rr=R-m.tire/2-m.rim/2, inner=R-m.tire-m.rim;
    let s='';
    for(let i=0;i<24;i++){const a=i/24*Math.PI*2;s+=`<line x1="${cx+Math.cos(a)*12}" y1="${cy+Math.sin(a)*12}" x2="${cx+Math.cos(a+.18)*inner}" y2="${cy+Math.sin(a+.18)*inner}" stroke="#3a3a3a" stroke-width="1.3"/>`}
    s+=`<circle cx="${cx}" cy="${cy}" r="${R-m.tire/2}" fill="none" stroke="#151515" stroke-width="${m.tire}"/>`;
    if(S.model==='GEIRA')s+=`<circle cx="${cx}" cy="${cy}" r="${R-m.tire/2}" fill="none" stroke="#2a2724" stroke-width="${m.tire-6}" stroke-dasharray="3 4"/>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="#1e1e1e" stroke-width="${m.rim}"/>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="30" fill="none" stroke="#9a9a9a" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="9" fill="#222"/>`;
    if(m.rim>20){
      const pid=tp+'2', r2=rr;
      s+=`<path id="${pid}" d="M${cx} ${cy} m -${r2} 0 a ${r2} ${r2} 0 1 1 ${2*r2} 0 a ${r2} ${r2} 0 1 1 -${2*r2} 0" fill="none"/>`;
      s+=`<text class="rimTxt" font-family="Michroma" font-size="${Math.min(15,m.rim*.36)}" letter-spacing="9" dominant-baseline="central" fill="${S.a}" opacity=".85"><textPath href="#${pid}" startOffset="8%">REGOLA</textPath></text><text class="rimTxt" font-family="Michroma" font-size="${Math.min(15,m.rim*.36)}" letter-spacing="9" dominant-baseline="central" fill="${S.a}" opacity=".85"><textPath href="#${pid}" startOffset="58%">REGOLA</textPath></text>`;
    }
    g.insertAdjacentHTML('beforeend',s);
  });
}

/* ---------- bande tricolore ---------- */
const FLAG=['#009246','#f1f2f1','#ce2b37'];
function seg3(x1,y1,x2,y2,t0,t1,w,order){
  let s='';
  for(let i=0;i<3;i++){
    const a=t0+(t1-t0)*i/3,b=t0+(t1-t0)*(i+1)/3;
    s+=`<line x1="${x1+(x2-x1)*a}" y1="${y1+(y2-y1)*a}" x2="${x1+(x2-x1)*b}" y2="${y1+(y2-y1)*b}" stroke="${FLAG[order[i]]}" stroke-width="${w}" stroke-linecap="butt"/>`;
  }
  return s;
}
function drawTri(){
  const m=MODELS[S.model];let s='';
  /* tube de selle (du boîtier vers le haut) : rouge, blanc, vert -> vert en haut */
  if(S.tri==='seat'||S.tri==='both')s+=seg3(455,447,403,178,.50,.66,m.w.st+1.5,[2,1,0]);
  /* tube supérieur (de la selle vers la direction) : vert, blanc, rouge */
  if(S.tri==='top'||S.tri==='both')s+=seg3(408,196,690,186,.74,.90,m.w.tt+1.5,[0,1,2]);
  $('tricolore').innerHTML=s;
}

/* ---------- render ---------- */
function render(){
  const m=MODELS[S.model];
  $('gf1').setAttribute('stop-color',S.p);$('gf2').setAttribute('stop-color',S.s);
  $('ck1').setAttribute('fill',S.p);$('ck2').setAttribute('fill',S.s);$('ck3').setAttribute('fill',S.s);
  $('marbleCol').setAttribute('flood-color',S.s);
  const frame=$('frame');
  frame.querySelectorAll('.t').forEach(u=>{
    const k=u.dataset.k;let c=S.p;
    if(S.motif==='fade')c='url(#gFade)';
    if(S.motif==='check')c=(k==='dt'||k==='ht'||k==='fk')?S.p:'url(#gChk)';
    if(S.motif==='split')c=u.classList.contains('rear')||k==='st'?S.s:S.p;
    u.setAttribute('stroke',c);u.setAttribute('stroke-width',m.w[k]);
  });
  frame.setAttribute('filter',S.motif==='marble'?'url(#fMarble)':'');
  frame.style.filter=S.f==='matte'?'saturate(.88) brightness(.97)':'';
  // overlays
  const ov=$('overlay');
  ov.querySelectorAll('use').forEach(u=>{u.setAttribute('stroke-width',m.w[u.dataset.k]);
    u.setAttribute('stroke',S.f==='iris'?'url(#gIris)':'url(#gSheen)')});
  ov.style.opacity=S.f==='iris'?.7:S.f==='metal'?.9:S.f==='gloss'?.35:0;
  ov.style.mixBlendMode=S.f==='iris'?'hard-light':'soft-light';
  $('gloss').style.opacity=S.f==='matte'?0:S.f==='gloss'?.55:.38;
  // decals
  $('logoTxt').setAttribute('fill',S.a);$('badge').setAttribute('fill',S.a);
  $('logoTxt').setAttribute('font-size',S.model==='DARDO'?21:17);
  $('nameTxt').setAttribute('fill',S.a);$('nameTxt').querySelector('textPath').textContent=S.name;
  drawTri();
  drawWheels();
  // stage text
  $('stModel').textContent=S.model;$('stType').textContent=t(m.type);
  const mot=t(MOTIFS.find(x=>x[0]===S.motif)[1]),fin=t(FINISH.find(x=>x[0]===S.f)[1]);
  $('stLine').textContent=mot+' · '+fin;
  $('c1').style.background=S.p;$('c2').style.background=S.s;$('c3').style.background=S.a;
  // summary
  const two=S.motif!=='solid';
  const P=nameOf(S.p),Q=two?' & '+nameOf(S.s):'',A=nameOf(S.a),nm=S.name.replace(/</g,'');
  const SUM={
    fr:`${mot} ${P}${Q}, finition ${fin.toLowerCase()}, logo ${A}${S.tri!=='none'?', fascia tricolore':''}${nm?`, signé « ${nm} »`:''}.`,
    it:`${mot} ${P}${Q}, finitura ${fin.toLowerCase().replace(/o$/,'a')}, logo ${A}${S.tri!=='none'?', fascia tricolore':''}${nm?`, firmata « ${nm} »`:''}.`,
    en:`${mot} in ${P}${Q}, ${fin.toLowerCase()} finish, ${A} logo${S.tri!=='none'?', tricolour band':''}${nm?`, signed “${nm}”`:''}.`
  };
  $('sum').innerHTML=`<b>${S.model}</b><br>`+SUM[LANG].replace(/&(?! )/g,'&amp;');
  const L={
    fr:['Bonjour,','Je souhaite un devis pour ce Regola :','Modèle','Motif','Couleurs','Accent / logo','Finition','Signature','Merci !','Devis Regola'],
    it:['Buongiorno,','Vorrei un preventivo per questa Regola:','Modello','Motivo','Colori','Accento / logo','Finitura','Firma','Grazie!','Preventivo Regola'],
    en:['Hello,','I would like a quote for this Regola:','Model','Pattern','Colours','Accent / logo','Finish','Signature','Thank you!','Regola quote']
  }[LANG];
  const body=`${L[0]}\n\n${L[1]}\n- ${L[2]} : ${S.model}\n- ${L[3]} : ${mot}\n- ${L[4]} : ${nameOf(S.p)} (${S.p}) / ${nameOf(S.s)} (${S.s})\n- ${L[5]} : ${A} (${S.a})\n- ${L[6]} : ${fin}\n- Tricolore : ${t(TRI.find(x=>x[0]===S.tri)[1])}\n- ${L[7]} : ${S.name||'—'}\n\n${L[8]}`;
  $('quote').href='mailto:info@regolabikes.com?subject='+encodeURIComponent(L[9]+' '+S.model)+'&body='+encodeURIComponent(body);
  // ui states
  document.querySelectorAll('#segModel button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.model));
  document.querySelectorAll('#segMotif button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.motif));
  document.querySelectorAll('#segTri button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.tri));
  document.querySelectorAll('#segFinish button').forEach(b=>b.classList.toggle('on',b.dataset.v===S.f));
  buildTabs();buildSwatches();
}

/* ---------- UI builders ---------- */
function seg(el,items,key,sub){
  $(el).innerHTML=items.map(([v,l])=>`<button data-v="${v}">${t(l)}${sub?`<small>${sub(v)}</small>`:''}</button>`).join('');
  $(el).onclick=e=>{const b=e.target.closest('button');if(!b)return;S[key]=b.dataset.v;render()};
}
function buildSegs(){
  seg('segModel',Object.keys(MODELS).map(k=>[k,k]),'model',k=>t(MODELS[k].type).split(' · ')[0]);
  seg('segMotif',MOTIFS,'motif');
  seg('segFinish',FINISH,'f');
  seg('segTri',TRI,'tri');
}
buildSegs();
window.onLangChange=()=>{buildSegs();render()};

function buildTabs(){
  const tb=[['p','Principale'],['s','Secondaire'],['a','Accent · logo']];
  $('tabs').innerHTML=tb.map(([k,l])=>`<button data-k="${k}" class="${S.tab===k?'on':''}"><i class="dot" style="background:${S[k]}"></i>${t(l)}</button>`).join('');
}
$('tabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;S.tab=b.dataset.k;buildTabs();buildSwatches()};
function buildSwatches(){
  const cur=S[S.tab];
  $('swatches').innerHTML=PAL.map(([n,h])=>`<button class="sw ${h===cur?'on':''}" style="background:${h}" title="${n}" data-h="${h}" aria-label="${n}"></button>`).join('')+
    `<label class="sw custom ${PAL.some(x=>x[1]===cur)?'':'on'}" title="${t('Couleur libre')}"><input type="color" id="free" value="${cur}"></label>`;
  $('swname').textContent=nameOf(cur);
  $('free').oninput=e=>{S[S.tab]=e.target.value;render()};
}
$('swatches').onclick=e=>{const b=e.target.closest('.sw[data-h]');if(!b)return;S[S.tab]=b.dataset.h;render()};
$('name').oninput=e=>{S.name=e.target.value;render()};

$('presets').innerHTML=PRESETS.map((p,i)=>`<button class="preset" data-i="${i}"><span class="pv" style="background:${p.motif==='fade'?`linear-gradient(135deg,${p.p},${p.s})`:p.motif==='check'?`repeating-conic-gradient(${p.p} 0 25%,${p.s} 0 50%) 0 0/10px 10px`:`linear-gradient(135deg,${p.p} 50%,${p.s} 50%)`}"></span>${p.n}</button>`).join('');
$('presets').onclick=e=>{const b=e.target.closest('.preset');if(!b)return;const p=PRESETS[b.dataset.i];Object.assign(S,{model:p.model,motif:p.motif,p:p.p,s:p.s,a:p.a,f:p.f,tri:p.tri||'none'});render()};

render();

/* modèle passé dans l'URL : atelier.html?m=DARDO */
const qm=new URLSearchParams(location.search).get('m');
if(qm&&MODELS[qm.toUpperCase()]){S.model=qm.toUpperCase();render()}
