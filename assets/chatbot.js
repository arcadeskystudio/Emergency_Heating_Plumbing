// ===== Callout chat widget (demo) =====
// Simulated with keyword matching + quick-reply buttons, not a real AI model.
// In production this button-driven flow can stay as the safe fallback even
// after wiring up a real language model for free-text understanding.

let chatState = { stage:'intro', service:null, issue:null, hasPhoto:false };

function openChat(){
  document.getElementById('chatPanel').classList.remove('hidden');
  document.getElementById('chatBubble').classList.add('hidden');
  if(document.getElementById('chatBody').children.length === 0){
    botSay("Hi, I'm Cal 👋 What's going on — what's the problem you're facing?");
    showChips(['Tap issue','Boiler not working','Blocked drain','Leaking pipe']);
  }
}
function closeChat(){
  document.getElementById('chatPanel').classList.add('hidden');
  document.getElementById('chatBubble').classList.remove('hidden');
}

function botSay(text){
  const body = document.getElementById('chatBody');
  const div = document.createElement('div');
  div.className = 'msg msg-bot';
  div.innerHTML = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}
function userSay(text){
  const body = document.getElementById('chatBody');
  const div = document.createElement('div');
  div.className = 'msg msg-user';
  div.textContent = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}
function showChips(options){
  const body = document.getElementById('chatBody');
  const row = document.createElement('div');
  row.className = 'chip-row';
  row.id = 'activeChips';
  options.forEach(opt=>{
    const b = document.createElement('button');
    b.className = 'chat-chip';
    b.textContent = opt;
    b.onclick = ()=>handleChip(opt);
    row.appendChild(b);
  });
  body.appendChild(row);
  body.scrollTop = body.scrollHeight;
}
function clearChips(){
  const c = document.getElementById('activeChips');
  if(c) c.remove();
}

function handleChip(choice){
  userSay(choice);
  clearChips();
  routeAfterProblem(choice);
}

function sendTyped(){
  const input = document.getElementById('chatTextInput');
  const val = input.value.trim();
  if(!val) return;
  userSay(val);
  input.value = '';

  if(chatState.stage === 'intro'){
    clearChips();
    routeAfterProblem(val);
  } else if(chatState.stage === 'awaitPostcode'){
    chatState.postcode = val;
    setTimeout(()=>{ botSay("And the best number to reach you on?"); chatState.stage='awaitPhone'; },400);
  } else if(chatState.stage === 'awaitPhone'){
    chatState.phone = val;
    finishChat();
  } else if(chatState.stage === 'awaitName'){
    chatState.name = val;
    setTimeout(()=>{ botSay("What's your postcode?"); chatState.stage='awaitPostcode'; },400);
  }
}

function routeAfterProblem(text){
  const t = text.toLowerCase();
  setTimeout(()=>{
    if(t.includes('tap')){
      chatState.service = 'water'; chatState.issue = 'Tap issue';
      botSay("Got it — a tap issue. Is it <strong>leaking</strong>, or <strong>not working / no water coming out</strong>?");
      showChips(['Leaking','Not working','Something else']);
      chatState.stage = 'awaitDetail';
    } else if(t.includes('boiler') || t.includes('heat')){
      chatState.service = 'heat'; chatState.issue = 'Heating issue';
      botSay("Sounds like a heating issue. Is it <strong>no heat</strong>, <strong>no hot water</strong>, or a <strong>strange noise/smell</strong>?");
      showChips(['No heat','No hot water','Strange noise or smell']);
      chatState.stage = 'awaitDetail';
    } else if(t.includes('drain') || t.includes('block')){
      chatState.service = 'water'; chatState.issue = 'Blocked drain';
      botSay("A blocked drain — is it fully blocked, or just draining slowly?");
      showChips(['Fully blocked','Draining slowly']);
      chatState.stage = 'awaitDetail';
    } else if(t.includes('leak') || t.includes('pipe') || t.includes('burst')){
      chatState.service = 'water'; chatState.issue = 'Leak / burst pipe';
      botSay("That sounds urgent. Is water actively flowing, or is it a slow drip?");
      showChips(['Actively flowing','Slow drip']);
      chatState.stage = 'awaitDetail';
    } else {
      chatState.service = null; chatState.issue = null;
      botSay("Thanks — just to narrow it down, is this more of a <strong>heating</strong> issue or a <strong>plumbing</strong> issue?");
      showChips(['Heating','Plumbing']);
      chatState.stage = 'awaitCategory';
    }
  }, 500);
}

function askDetailFor(category){
  setTimeout(()=>{
    if(category === 'Heating'){
      chatState.service = 'heat'; chatState.issue = 'Heating issue';
      botSay("Is it <strong>no heat</strong>, <strong>no hot water</strong>, or a <strong>strange noise/smell</strong>?");
      showChips(['No heat','No hot water','Strange noise or smell']);
    } else {
      chatState.service = 'water'; chatState.issue = 'Plumbing issue';
      botSay("Is it a <strong>leak</strong>, a <strong>blockage</strong>, or something else?");
      showChips(['A leak','A blockage','Something else']);
    }
    chatState.stage = 'awaitDetail';
  }, 500);
}

// handleChip is redefined below to branch by conversation stage
// (tap/heating/plumbing routing happens in routeAfterProblem, detail
// answers like "leaking" / "not working" are handled here)
handleChip = function(choice){
  userSay(choice);
  clearChips();
  if(chatState.stage === 'awaitCategory'){
    askDetailFor(choice);
  } else if(chatState.stage === 'awaitDetail'){
    chatState.detail = choice;
    setTimeout(()=>{
      botSay(`Thanks — a ${chatState.issue.toLowerCase()} that's <strong>${choice.toLowerCase()}</strong>. Could you send a quick photo? That helps the engineer bring the right parts.`);
      showChips(['📷 Add a photo','Skip photo']);
      chatState.stage = 'awaitPhotoChoice';
    }, 500);
  } else if(chatState.stage === 'awaitPhotoChoice'){
    if(choice === '📷 Add a photo'){
      document.getElementById('chatFileInput').click();
    } else {
      proceedToName();
    }
  } else {
    routeAfterProblem(choice);
  }
};

function proceedToName(){
  setTimeout(()=>{
    botSay("Great, nearly done. What's your name?");
    chatState.stage = 'awaitName';
  }, 400);
}

function handleChatFile(e){
  const file = e.target.files[0];
  if(!file) return;
  const url = URL.createObjectURL(file);
  const body = document.getElementById('chatBody');
  const div = document.createElement('div');
  div.className = 'msg msg-user';
  div.innerHTML = `<img src="${url}" alt="Uploaded photo">`;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
  chatState.hasPhoto = true;
  proceedToName();
}

function finishChat(){
  setTimeout(()=>{
    botSay(`Thanks ${chatState.name || ''}! I've passed this to our team — an engineer covering ${chatState.postcode || 'your area'} will call ${chatState.phone || 'you'} shortly to confirm and give you an ETA.`);
    setTimeout(()=>{
      const body = document.getElementById('chatBody');
      const div = document.createElement('div');
      div.className = 'msg msg-bot';
      div.innerHTML = `<strong>Reference: CO-${Math.floor(10000+Math.random()*89999)}</strong><br>You can also track this on your dashboard once you're signed up.`;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }, 600);
  }, 500);
}
