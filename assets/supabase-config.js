// ============================================================
// Fill these in from your Supabase project:
// Project Settings → API → Project URL, and the "anon public" key
// ============================================================
const SUPABASE_URL = 'https://uksheujivayqflgjteow.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_M9aGaSJwW4gy38PqWMfQDw_ye6rvTha';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
