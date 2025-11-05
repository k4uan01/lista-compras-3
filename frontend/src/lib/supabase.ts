import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Variáveis de ambiente do Supabase não configuradas!');
  console.warn('Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY na Vercel');
  console.warn('O app vai funcionar, mas funcionalidades do Supabase não estarão disponíveis.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

