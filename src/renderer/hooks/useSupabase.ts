import { createClient } from '@supabase/supabase-js';
import { merge } from 'lodash';
import { useCallback } from 'react';
// eslint-disable-next-line import/no-cycle
import { IUser } from '../providers/AppStateProvider';
import { useAsync } from './useAsync';

const supabase = createClient(
  'https://qtxutgzparbaqvqocfyq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0eHV0Z3pwYXJiYXF2cW9jZnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NTUzNDgsImV4cCI6MjAxNDIzMTM0OH0.r-sS87xxXk5jjsZgZNtHQnKs0VyD4AMvaDCsrH0D_3Y',
);

export const useSupabase = () => {
  return supabase;
};

export const useSupabaseEmailLogin = () => {
  return {
    login: async (email: string, password: string): Promise<IUser> => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      return {
        id: data?.user?.id!,
        email: data?.user?.email!,
        role: data?.user?.role!,
        isAdmin: data?.user?.role === 'authenticated',
      };
    },
    logout: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    },
  };
};

export interface ISettings {
  ticketNumber: number;
}

export const useSettings = () => {
  const { data: settings, refresh } = useAsync<ISettings>(async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('settings')
      .single();
    if (error) {
      throw error;
    }
    return data?.settings;
  });

  const updateSettings = useCallback(
    async (newSettings: Partial<ISettings>) => {
      const { error } = await supabase
        .from('settings')
        .update({ settings: merge(settings, newSettings) })
        .eq('id', 1);
      await refresh();
      if (error) {
        throw error;
      }
    },
    [settings, refresh],
  );

  return { settings, updateSettings };
};
