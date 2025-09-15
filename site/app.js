async function loadTimeline(){
  const res = await fetch('../timeline.json', {cache: 'no-store'}).catch(()=>null);
  if(!res || !res.ok){
    renderError('No se pudo cargar timeline.json. Primero ejecuta build_timeline.py');
    return;
  }
  const data = await res.json();
  renderSection('pre-list', data.pre, 'Pre');
  renderSection('post-list', data.post, 'Post');
  setupLightbox();
}

function renderError(msg){
  const container = document.querySelector('.container');
  const div = document.createElement('div');
  div.style.background = '#fff3f6';
  div.style.border = '1px solid #f5d1df';
  div.style.padding = '12px 16px';
  div.style.borderRadius = '8px';
  div.textContent = msg;
  container.prepend(div);
}

function renderSection(containerId, weeks, label){
  const container = document.getElementById(containerId);
  if(!container){return}
  const template = document.getElementById('week-item-template');
  const sorted = [...(weeks||[])].sort((a,b)=> (a.week||0) - (b.week||0));
  for(const w of sorted){
    const node = template.content.cloneNode(true);
    node.querySelector('.week-title').textContent = `Semana ${w.week}`;
    const dates = [w.start, w.end].filter(Boolean).join(' – ');
    node.querySelector('.week-dates').textContent = dates || '';
    node.querySelector('.comment').textContent = w.comment || '';

    const grid = node.querySelector('.photos-grid');
    for(const p of (w.photos||[])){
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = `Foto W${w.week}`;
      img.src = `../${p}`;
      grid.appendChild(img);
    }

    container.appendChild(node);
  }
}

// Simple lightbox implementation
function setupLightbox(){
  const overlay = document.getElementById('lightbox');
  if(!overlay) return;
  const imgEl = overlay.querySelector('.lightbox-image');
  const btnClose = overlay.querySelector('.lightbox-close');
  const btnPrev = overlay.querySelector('.lightbox-prev');
  const btnNext = overlay.querySelector('.lightbox-next');

  let list = [];
  let idx = 0;

  function show(){
    if(!list.length) return;
    imgEl.src = list[idx];
  }
  function open(newList, startIndex){
    list = newList;
    idx = startIndex;
    show();
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close(){
    overlay.hidden = true;
    document.body.style.overflow = '';
    list = [];
    idx = 0;
    imgEl.src = '';
  }
  function prev(){
    if(!list.length) return;
    idx = (idx - 1 + list.length) % list.length;
    show();
  }
  function next(){
    if(!list.length) return;
    idx = (idx + 1) % list.length;
    show();
  }

  // Delegated click for all images
  document.addEventListener('click', (e)=>{
    const target = e.target;
    if(!(target instanceof Element)) return;
    if(target.matches('.photos-grid img')){
      const grid = target.closest('.photos-grid');
      if(!grid) return;
      const imgs = Array.from(grid.querySelectorAll('img'));
      const sources = imgs.map(i => i.getAttribute('src'));
      const start = sources.indexOf(target.getAttribute('src'));
      open(sources, Math.max(0, start));
    }
  });

  btnClose.addEventListener('click', close);
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  window.addEventListener('keydown', (e)=>{
    if(overlay.hidden) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });
}

window.addEventListener('DOMContentLoaded', loadTimeline);


