import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useMemo } from 'react';
import { useConfigState } from '../providers/ConfigStateProvider';
import { TicketsAPI } from '../apis/ticket-api';
import { AuthAPI } from '../apis/auth-api';
import { ProductsAPI } from '../apis/products-api';
import { MiscellaneousAPI } from '../apis/miscellaneous-api';
// Singleton para almacenar la instancia del cliente
let supabaseInstance: SupabaseClient | null = null;

export const useSupabase = () => {
  const { supabaseAnnonKey, supabaseUrl } = useConfigState();

  return useMemo(() => {
    // Si ya existe una instancia y las credenciales son las mismas, reutilízala
    if (supabaseInstance) {
      return supabaseInstance;
    }

    // Crear nueva instancia solo si no existe o las credenciales cambiaron
    supabaseInstance = createClient(supabaseUrl!, supabaseAnnonKey!);
    return supabaseInstance;
  }, [supabaseUrl, supabaseAnnonKey]);
};

export const useTicketsApi = () => {
  const supabase = useSupabase();
  return useMemo(() => new TicketsAPI(supabase), [supabase]);
};

export const useAuthApi = () => {
  const supabase = useSupabase();
  return useMemo(() => new AuthAPI(supabase), [supabase]);
};

export const useProductsApi = () => {
  const supabase = useSupabase();
  return useMemo(() => new ProductsAPI(supabase), [supabase]);
};

export const useMiscellaneousApi = () => {
  const supabase = useSupabase();
  return useMemo(() => new MiscellaneousAPI(supabase), [supabase]);
};
