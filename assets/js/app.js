import { getLang, setLang, t, applyTranslations } from './i18n.js';
import { data as defaultData } from './data.js';
import { getParam, el } from './utils.js';

// ---- Site data used by pages ----
let siteData = defaultData; // fallback; replaced if CMS JSON loads

/** Try to load JSON files edited by CMS (Decap) from /content/*.json */
async function loadCMSData(){
  try{
    const [progRes, facRes, newsRes, evRes] = await Promise.all([
      fetch('content/programs.json', {cache:'no-store'}),
      fetch('content/faculty.json', {cache:'no-store'}),
      fetch('content/news.json', {cache:'no-store'}),
      fetch('content/events.json', {cache:'no-store'}),
    ]);
    if(!progRes.ok || !facRes.ok || !newsRes.ok || !evRes.ok) throw new Error('Missing content JSON');
    const [prog, fac, news, ev] = await Promise.all([progRes.json(), facRes.json(), newsRes.json(), evRes.json()]);

    const programs = (prog.items||[]).map(p => ({
      id: p.id, degree: p.degree,
      title: {en:p.title_en, ar:p.title_ar},
      overview: {en:p.overview_en, ar:p.overview_ar},
      outcomes: {en: p.outcomes_en||[], ar: p.outcomes_ar||[]},
      coordinator: {en:p.coordinator_en||'', ar:p.coordinator_ar||''},
      curriculum: {
        en: [['Course','Credits']].concat((p.curriculum_en||[]).map(r=>[r.course, r.credits])),
        ar: [['المقرر','الوحدات']].concat((p.curriculum_ar||[]).map(r=>[r.course, r.credits]))
      }
    }));

    const faculty = (fac.items||[]).map(f => ({
      id: f.id,
      name: {en:f.name_en, ar:f.name_ar},
      title:{en:f.title_en, ar:f.title_ar},
      email: f.email,
      office:{en:f.office_en, ar:f.office_ar},
      research: f.research||[],
      photo: f.photo||'assets/img/placeholder.png',
      bio: {en:f.bio_en||'', ar:f.bio_ar||''}
    }));

    const newsArr = (news.items||[]).map(n => ({
      id: n.id,
      title:{en:n.title_en, ar:n.title_ar},
      date:n.date,
      summary:{en:n.summary_en, ar:n.summary_ar},
      hero:n.hero||'assets/img/placeholder.png',
      body:{en:n.body_en||'', ar:n.body_ar||''}
    }));

    const eventsArr = (ev.items||[]).map(e => ({
      id: e.id,
      title:{en:e.title_en, ar:e.title_ar},
      start:e.start, end:e.end,
      location:{en:e.location_en, ar:e.location_ar},
      summary:{en:e.summary_en, ar:e.summary_ar},
      body:{en:e.body_en||'', ar:e.body_ar||''}
    }));

    siteData = { programs, faculty, news: newsArr, events: eventsArr };
    console.log('[CMS] Loaded JSON content.');
  }catch(err){
    console.warn('[CMS] Using fallback bundled data.js due to:', err.message);
  }
}

/** Initialize chrome & translations */
function initChrome(){
  document.documentElement.lang = getLang();
  document.documentElement.dir  = (getLang()==='ar'?'rtl':'ltr');
  applyTranslations();
  const btnEN=document.querySelector('#lang-en'); const btnAR=document.querySelector('#lang-ar');
  if(btnEN&&btnAR){
    const cur=getLang();
    btnEN.classList.toggle('active', cur==='en'); btnAR.classList.toggle('active', cur==='ar');
    btnEN.addEventListener('click', ()=>{ setLang('en'); location.reload(); });
    btnAR.addEventListener('click', ()=>{ setLang('ar'); location.reload(); });
  }
}
function applyNavLabels(){
  document.querySelectorAll('[data-i18n]').forEach(()=> applyTranslations());
  const s=document.querySelector('input[type="search"]'); if(s) s.setAttribute('placeholder', t('search_placeholder'));
}
function renderCards(container, items, renderItem){
  container.innerHTML='';
  if(!items || !items.length){ container.appendChild(el('p',{class:'muted', text:t('no_items')})); return; }
  items.forEach(item=> container.appendChild(renderItem(item)));
}

/** Programs */
function initPrograms(){
  const grid=document.getElementById('programs-grid'); if(!grid) return;
  const lang=getLang(); const q=(document.getElementById('q')?.value||'').toLowerCase();
  let list=siteData.programs; if(q) list=list.filter(p=> (p.title[lang]||'').toLowerCase().includes(q));
  renderCards(grid, list, p => el('a',{href:`program.html?id=${p.id}`, class:'card'},[
    el('img',{src:'assets/img/placeholder.png', alt:p.title[lang]}),
    el('h3',{text:p.title[lang]}),
    el('span',{class:'badge', text:p.degree}),
    el('p',{class:'lead', text:p.overview[lang]})
  ]));
}
function initProgramDetail(){
  const wrap=document.getElementById('program-detail'); if(!wrap) return;
  const id=new URL(location).searchParams.get('id'); const lang=getLang();
  const item=siteData.programs.find(p=>p.id===id); if(!item){ wrap.textContent=t('no_items'); return; }
  wrap.appendChild(el('h1',{text:item.title[lang]}));
  wrap.appendChild(el('h2',{text:t('overview')})); wrap.appendChild(el('p',{text:item.overview[lang]}));
  wrap.appendChild(el('h2',{text:t('outcomes')})); const ul=el('ul'); (item.outcomes[lang]||[]).forEach(o=> ul.appendChild(el('li',{text:o}))); wrap.appendChild(ul);
  if(item.curriculum && item.curriculum[lang]){ wrap.appendChild(el('h2',{text:t('curriculum')})); const table=el('table');
    item.curriculum[lang].forEach((row,i)=>{ const tr=el('tr'); row.forEach(cell=> tr.appendChild(el(i===0?'th':'td',{text:cell}))); table.appendChild(tr); }); wrap.appendChild(table); }
  wrap.appendChild(el('h2',{text:t('admission')})); wrap.appendChild(el('p',{text:item.overview[lang]}));
  wrap.appendChild(el('p',{text:`${t('coordinator')}: ${item.coordinator[lang]}`}));
}

/** Faculty */
function initFaculty(){
  const grid=document.getElementById('faculty-grid'); if(!grid) return;
  const lang=getLang(); const q=(document.getElementById('q')?.value||'').toLowerCase();
  let list=siteData.faculty; if(q) list=list.filter(f=> (f.name[lang]||'').toLowerCase().includes(q));
  renderCards(grid, list, f => el('a',{href:`faculty-detail.html?id=${f.id}`, class:'card'},[
    el('img',{src:f.photo, alt:f.name[lang]}), el('h3',{text:f.name[lang]}), el('p',{class:'lead', text:f.title[lang]}), el('p',{text:(f.research||[]).join(', ') })
  ]));
}
function initFacultyDetail(){
  const wrap=document.getElementById('faculty-detail'); if(!wrap) return;
  const id=new URL(location).searchParams.get('id'); const lang=getLang();
  const f=siteData.faculty.find(x=>x.id===id); if(!f){ wrap.textContent=t('no_items'); return; }
  const header=el('div',{class:'grid'},[ el('img',{src:f.photo, alt:f.name[lang], style:'max-width:260px'}),
    el('div',{},[ el('h1',{text:f.name[lang]}), el('p',{class:'lead', text:f.title[lang]}),
      el('p',{text:f.email}), el('p',{text:f.office[lang]}), el('p',{text:(f.research||[]).join(', ')}) ]) ]);
  wrap.appendChild(header); wrap.appendChild(el('div',{class:'prose'},[ el('p',{text:f.bio[lang]}) ]));
}

/** News */
function initNews(){
  const grid=document.getElementById('news-grid'); if(!grid) return;
  const lang=getLang();
  renderCards(grid, siteData.news, n => el('a',{href:`news-detail.html?id=${n.id}`, class:'card'},[
    el('img',{src:n.hero, alt:n.title[lang]}), el('h3',{text:n.title[lang]}), el('p',{class:'lead', text:`${n.date} — ${n.summary[lang]}`})
  ]));
}
function initNewsDetail(){
  const wrap=document.getElementById('news-detail'); if(!wrap) return;
  const id=new URL(location).searchParams.get('id'); const lang=getLang();
  const n=siteData.news.find(x=>x.id===id); if(!n){ wrap.textContent=t('no_items'); return; }
  wrap.appendChild(el('p',{class:'lead', text:n.date})); wrap.appendChild(el('h1',{text:n.title[lang]}));
  wrap.appendChild(el('img',{src:n.hero, alt:n.title[lang]})); wrap.appendChild(el('p',{text:n.summary[lang]}));
  wrap.appendChild(el('div',{class:'prose'},[ el('p',{text:n.body[lang]}) ]));
}

/** Events */
function initEvents(){
  const grid=document.getElementById('events-grid'); if(!grid) return;
  const lang=getLang();
  renderCards(grid, siteData.events, e => el('a',{href:`event-detail.html?id=${e.id}`, class:'card'},[
    el('h3',{text:e.title[lang]}), el('p',{class:'lead', text:`${e.start}${e.end? ' → '+e.end:''}` }),
    el('p',{text:e.location[lang]}), el('p',{text:e.summary[lang]}) ]));
}
function initEventDetail(){
  const wrap=document.getElementById('event-detail'); if(!wrap) return;
  const id=new URL(location).searchParams.get('id'); const lang=getLang();
  const e=siteData.events.find(x=>x.id===id); if(!e){ wrap.textContent=t('no_items'); return; }
  wrap.appendChild(el('h1',{text:e.title[lang]}));
  wrap.appendChild(el('p',{text:`${t('when')}: ${e.start}${e.end? ' → '+e.end:''}`}));
  wrap.appendChild(el('p',{text:`${t('location')}: ${e.location[lang]}`}));
  wrap.appendChild(el('p',{class:'lead', text:e.summary[lang]}));
  wrap.appendChild(el('div',{class:'prose'},[ el('p',{text:e.body[lang]}) ]));
}

/** Contact (demo only) */
function initContact(){
  const form=document.getElementById('contact-form'); if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault(); const name=form.querySelector('[name="name"]').value.trim();
    const email=form.querySelector('[name="email"]').value.trim(); const msg=form.querySelector('[name="message"]').value.trim();
    if(!name||!email||!msg){ alert('Please complete all fields.'); return; }
    console.log('Contact form submission:', {name, email, msg}); alert('Thank you! (Check console for this demo)'); form.reset();
  });
}

/** Simple global search */
function initSearch(){
  const input=document.querySelector('input[type="search"]'); const box=document.getElementById('search-results'); if(!input||!box) return;
  const lang=getLang();
  function run(q){
    q=(q||'').toLowerCase(); const hits=[];
    siteData.programs.forEach(p=>{ if((p.title[lang]||'').toLowerCase().includes(q)) hits.push({type:'Program',title:p.title[lang], url:`program.html?id=${p.id}`}); });
    siteData.faculty.forEach(f=>{ if((f.name[lang]||'').toLowerCase().includes(q)) hits.push({type:'Faculty',title:f.name[lang], url:`faculty-detail.html?id=${f.id}`}); });
    siteData.news.forEach(n=>{ if((n.title[lang]||'').toLowerCase().includes(q)) hits.push({type:'News',title:n.title[lang], url:`news-detail.html?id=${n.id}`}); });
    siteData.events.forEach(e=>{ if((e.title[lang]||'').toLowerCase().includes(q)) hits.push({type:'Event',title:e.title[lang], url:`event-detail.html?id=${e.id}`}); });
    box.innerHTML=''; if(!q || !hits.length){ box.appendChild(el('p',{class:'muted', text:t('no_items')})); return; }
    hits.forEach(h=> box.appendChild(el('div',{class:'card'},[ el('strong',{text:h.type+': '}), el('a',{href:h.url, text:h.title}) ])));
  }
  input.addEventListener('input', e=> run(e.target.value));
}

/** Entry point */
export async function boot(){
  await loadCMSData();
  initChrome(); applyNavLabels();
  initPrograms(); initProgramDetail(); initFaculty(); initFacultyDetail();
  initNews(); initNewsDetail(); initEvents(); initEventDetail(); initContact(); initSearch();
}
