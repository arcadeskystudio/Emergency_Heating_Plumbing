// ===== Site image loader =====
// Any <img data-img-slot="hero" src="fallback.jpg"> gets its src swapped
// for the URL an admin uploaded via admin.html, if one exists.

async function loadSiteImages(){
  const els = document.querySelectorAll('[data-img-slot]');
  if(els.length === 0) return;
  try{
    const { data, error } = await supabaseClient.from('site_images').select('slot,url');
    if(error || !data) return;
    const map = {};
    data.forEach(row => { if(row.url) map[row.slot] = row.url; });
    els.forEach(el => {
      const slot = el.getAttribute('data-img-slot');
      if(map[slot]) el.src = map[slot];
    });
  } catch(e){
    // Supabase not configured yet, or offline — placeholders stay as-is
    console.warn('Site images not loaded, showing placeholders:', e);
  }
}

document.addEventListener('DOMContentLoaded', loadSiteImages);
