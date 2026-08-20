// Shared helpers for the Callout prototype (front-end only, no backend)

// Pill toggler: radio-style within a group for radios, multi-toggle for checkboxes.
// Note: clicks on a <label> fire twice (label + forwarded input click) — we only
// act on the event whose target is the input, or the first if no input exists.
document.addEventListener('click', function(e){
  const pill = e.target.closest('.check-pill');
  if(!pill) return;
  const input = pill.querySelector('input');
  if(input && e.target !== input) return; // skip the duplicate label-click
  if(input && input.type === 'radio'){
    // single-select: clear siblings in the same group
    const group = input.name ? document.querySelectorAll(`input[name="${input.name}"]`) : [];
    group.forEach(r => r.closest('.check-pill') && r.closest('.check-pill').classList.remove('on'));
    pill.classList.add('on');
    input.checked = true;
  } else {
    pill.classList.toggle('on');
    if(input) input.checked = pill.classList.contains('on');
  }
});

// (Postcode lookup now uses the real postcodes.io API in request-service.html)
