// Shared helpers for the Callout prototype (front-end only, no backend)

// Pill toggler — one tap, every time.
// The <input> inside is display:none, and browsers differ on how/when they
// forward label clicks to hidden inputs (this caused the "click many times"
// bug). So we take full control: preventDefault stops any forwarded click,
// and we set the state ourselves.
document.addEventListener('click', function(e){
  const pill = e.target.closest('.check-pill');
  if(!pill) return;
  e.preventDefault();
  const input = pill.querySelector('input');
  if(input && input.type === 'radio'){
    // radio behaviour: selecting this pill un-selects the rest of its group
    if(input.name){
      document.querySelectorAll(`input[name="${input.name}"]`).forEach(r => {
        const p = r.closest('.check-pill');
        if(p) p.classList.remove('on');
        r.checked = false;
      });
    }
    pill.classList.add('on');
    input.checked = true;
  } else {
    pill.classList.toggle('on');
    if(input) input.checked = pill.classList.contains('on');
  }
});

// (Postcode lookup now uses the real postcodes.io API in request-service.html)
