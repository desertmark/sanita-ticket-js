import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient;

export async function getSupabase() {
  if (supabaseInstance) {
    return supabaseInstance;
  }
  const config = await window.electron.app.getConfig();
  const supabase = createClient(config.supabaseUrl!, config.supabaseAnnonKey!);
  supabaseInstance = supabase;
  return supabase;
}
