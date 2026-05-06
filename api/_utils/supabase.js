const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Missing credentials. Set SUPABASE_URL and SUPABASE_KEY env vars.');
}

// Public client — used for read operations (respects RLS)
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Admin client — uses service role key to bypass RLS for write operations
// Falls back to anon key if service key not set (ensure RLS policies allow anon writes in that case)
const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || supabaseAnonKey || 'placeholder-key'
);

module.exports = supabase;
module.exports.supabaseAdmin = supabaseAdmin;
