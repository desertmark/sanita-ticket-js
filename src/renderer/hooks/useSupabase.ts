import { createClient } from '@supabase/supabase-js';
import { useMemo } from 'react';
import { useConfigState } from '../providers/ConfigStateProvider';
import { TicketsAPI } from '../apis/ticket-api';
import { AuthAPI } from '../apis/auth-api';

const useSupabase = () => {
  const { supabaseAnnonKey, supabaseUrl } = useConfigState();
  return useMemo(() => createClient(supabaseUrl!, supabaseAnnonKey!), [supabaseUrl, supabaseAnnonKey]);
};

export const useTicketsApi = () => {
  const supabase = useSupabase();
  return useMemo(() => new TicketsAPI(supabase), [supabase]);
};

export const useAuthApi = () => {
  const supabase = useSupabase();
  return useMemo(() => new AuthAPI(supabase), [supabase]);
};
