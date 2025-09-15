async function loadCounts() {
  try {
    const res = await fetch('../timeline.json', { cache: 'no-store' });
    if (!res.ok) return;
    
    const data = await res.json();
    
    const preCount = document.getElementById('pre-count');
    const postCount = document.getElementById('post-count');
    
    if (preCount) {
      preCount.textContent = `${data.pre?.length || 0} semanas`;
    }
    if (postCount) {
      postCount.textContent = `${data.post?.length || 0} semanas`;
    }
  } catch (e) {
    console.warn('No se pudo cargar timeline.json:', e);
  }
}

window.addEventListener('DOMContentLoaded', loadCounts);
