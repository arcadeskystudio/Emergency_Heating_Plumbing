// Shared helpers for the Callout prototype (front-end only, no backend)

// Generic multi-select pill toggler: click a .check-pill to toggle its "on" state
document.addEventListener('click', function(e){
  const pill = e.target.closest('.check-pill');
  if(pill){
    pill.classList.toggle('on');
    const cb = pill.querySelector('input[type=checkbox]');
    if(cb) cb.checked = pill.classList.contains('on');
  }
});

// Demo postcode/address dataset (Fife / Dunfermline area) used on the request-service page
const DEMO_ADDRESSES = [
  { postcode:'KY11 4AB', line:'12 Priory Lane, Dunfermline' },
  { postcode:'KY11 4AB', line:'14 Priory Lane, Dunfermline' },
  { postcode:'KY11 3JX', line:'2 Abbey View, Dunfermline' },
  { postcode:'KY11 3JX', line:'4 Abbey View, Dunfermline' },
  { postcode:'KY12 7RS', line:'21 Carnegie Drive, Dunfermline' },
  { postcode:'KY1 1XQ', line:'8 High Street, Kirkcaldy' },
  { postcode:'KY7 6UZ', line:'5 Glenrothes Road, Glenrothes' },
  { postcode:'EH1 2NG', line:'33 Cowgate, Edinburgh' },
  { postcode:'EH12 5AB', line:'9 Corstorphine Road, Edinburgh' },
];
