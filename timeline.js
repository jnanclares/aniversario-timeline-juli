async function loadTimeline(section) {
  try {
    const res = await fetch('./timeline.json', { cache: 'no-store' });
    if (!res.ok) {
      renderError('No se pudo cargar timeline.json. Primero ejecuta build_timeline.py');
      return;
    }
    
    const data = await res.json();
    const weeks = section === 'pre' ? data.pre : data.post;
    
    renderTimeline(weeks || []);
    setupLightbox();
  } catch (e) {
    renderError('Error cargando los datos del timeline');
    console.error(e);
  }
}

function renderError(msg) {
  const container = document.querySelector('.timeline-container');
  const div = document.createElement('div');
  div.style.background = '#fff3f6';
  div.style.border = '1px solid #f5d1df';
  div.style.padding = '12px 16px';
  div.style.borderRadius = '8px';
  div.style.textAlign = 'center';
  div.textContent = msg;
  container.appendChild(div);
}

function renderTimeline(weeks) {
  const container = document.getElementById('timeline');
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Sort weeks by number
  const sorted = [...weeks].sort((a, b) => (a.week || 0) - (b.week || 0));
  
  sorted.forEach((week, index) => {
    const card = createWeekCard(week, index);
    container.appendChild(card);
  });
}

function createWeekCard(week, index) {
  const card = document.createElement('div');
  card.className = 'week-card';
  card.style.animationDelay = `${index * 0.1}s`;
  
  const dates = [week.start, week.end].filter(Boolean).join(' – ');
  
  card.innerHTML = `
    <div class="week-card-header">
      <h3 class="week-title">Semana ${week.week}</h3>
      <div class="week-dates">${dates || ''}</div>
    </div>
    <div class="week-content">
      ${week.comment ? `<p class="comment">${week.comment}</p>` : ''}
      <div class="photos-grid">
        ${(week.photos || []).map(photo => 
          `<img src="./${photo}" alt="Foto W${week.week}" loading="lazy" />`
        ).join('')}
      </div>
    </div>
  `;
  
  return card;
}

// Lightbox implementation
function setupLightbox() {
  const overlay = document.getElementById('lightbox');
  if (!overlay) return;
  
  const imgEl = overlay.querySelector('.lightbox-image');
  const btnClose = overlay.querySelector('.lightbox-close');
  const btnPrev = overlay.querySelector('.lightbox-prev');
  const btnNext = overlay.querySelector('.lightbox-next');

  let list = [];
  let idx = 0;

  function show() {
    if (!list.length) return;
    imgEl.src = list[idx];
  }

  function open(newList, startIndex) {
    list = newList;
    idx = startIndex;
    show();
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    list = [];
    idx = 0;
    imgEl.src = '';
  }

  function prev() {
    if (!list.length) return;
    idx = (idx - 1 + list.length) % list.length;
    show();
  }

  function next() {
    if (!list.length) return;
    idx = (idx + 1) % list.length;
    show();
  }

  // Delegated click for all images
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.matches('.photos-grid img')) {
      const grid = target.closest('.photos-grid');
      if (!grid) return;
      const imgs = Array.from(grid.querySelectorAll('img'));
      const sources = imgs.map(i => i.getAttribute('src'));
      const start = sources.indexOf(target.getAttribute('src'));
      open(sources, Math.max(0, start));
    }
  });

  btnClose.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { 
    if (e.target === overlay) close(); 
  });
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  
  window.addEventListener('keydown', (e) => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
}
