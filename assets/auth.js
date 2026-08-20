// ===== Shared auth helpers =====

async function getSession(){
  const { data } = await supabaseClient.auth.getSession();
  return data.session;
}

async function getProfile(userId){
  const { data, error } = await supabaseClient.from('profiles').select('*').eq('id', userId).single();
  if(error) return null;
  return data;
}

// Redirects to login.html if not signed in. Returns {session, profile} if signed in.
async function requireAuth(){
  const session = await getSession();
  if(!session){
    window.location.href = 'login.html';
    return null;
  }
  const profile = await getProfile(session.user.id);
  return { session, profile };
}

async function logout(){
  await supabaseClient.auth.signOut();
  window.location.href = 'index.html';
}

function showAuthError(elId, message){
  const el = document.getElementById(elId);
  if(el){ el.textContent = message; el.classList.remove('hidden'); }
}
