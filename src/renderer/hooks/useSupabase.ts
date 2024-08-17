/* eslint-disable import/no-cycle */
import { createClient } from '@supabase/supabase-js';
import { merge } from 'lodash';
import { useCallback, useMemo } from 'react';
import { IUser } from '../providers/AppStateProvider';
import { useAsync } from './useAsync';
import { IHistoryItem, ITicketLine } from '../../types';
import { toHistoryItem, toTicket } from '../../utils';
import { useConfigState } from '../providers/ConfigStateProvider';

export interface ISettings {
  ticketNumber: number;
}

export interface ITicket {
  id: number;
  ticket_number: number;
  pay_method: string;
  created_at: string;
  lines: ITicketLine[];
  discount: number;
  subtotal: number;
  total: number;
  state: TicketState;
}

export interface IApiPagination {
  from: number;
  to: number;
}

export interface ITablePagination {
  page: number;
  size?: number;
}

export enum TicketState {
  anulled = 'annulled',
  confirmed = 'confirmed',
}

const useSupabase = () => {
  const { supabaseAnnonKey, supabaseUrl } = useConfigState();
  return useMemo(
    () => createClient(supabaseUrl!, supabaseAnnonKey!),
    [supabaseUrl, supabaseAnnonKey],
  );
};

export const useAuthApi = () => {
  const supabase = useSupabase();

  const getUserRole = useCallback(
    async (userId: string): Promise<string> => {
      const { data: roleRes, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      if (roleError) {
        throw roleError;
      }
      return roleRes[0]?.role || '';
    },
    [supabase],
  );

  const loadSession = useCallback(async (): Promise<IUser | null> => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      const role = await getUserRole(data?.user?.id!);
      return {
        id: data?.user.id,
        email: data?.user.email!,
        role: role || data?.user.role!,
        isAdmin: data?.user.role === 'authenticated',
      };
    }
    return null;
  }, [getUserRole, supabase.auth]);

  const login = async (email: string, password: string): Promise<IUser> => {
    const { data: userRes, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    const role = await getUserRole(userRes?.user?.id!);
    return {
      id: userRes?.user?.id!,
      email: userRes?.user?.email!,
      role: role || userRes?.user?.role!,
      isAdmin: userRes?.user?.role === 'admin',
    };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  return {
    loadSession,
    login,
    logout,
  };
};

export const useSettings = () => {
  const supabase = useSupabase();

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

const fromItems = (page: number, size: number) => page * size;
const toItems = (from: number, size: number) => from + size - 1;

export const useTicketsApi = (size = 10) => {
  const supabase = useSupabase();

  // const [page, setPage] = useState<number>(0);
  const fromState = fromItems(0, size);
  const toState = toItems(fromState, size);

  const { data: tickets, refresh: refreshTickets } = useAsync<
    IHistoryItem[],
    IApiPagination
  >(async ({ from, to } = { from: fromState, to: toState }) => {
    const { data, error } = await supabase
      .from('tickets')
      .select<'*', ITicket>('*')
      .order('ticket_number', { ascending: false })
      .range(from, to);
    if (error) {
      throw error;
    }
    return data.map(toHistoryItem);
  });

  const { data: totalTickets, refresh: refreshTotalTickets } = useAsync<number>(
    async () => {
      const { error, count } = await supabase
        .from('tickets')
        .select<'*', number>('*', { count: 'exact', head: true });
      if (error) {
        throw error;
      }
      return count || 0;
    },
  );

  const loadTickets = useCallback(
    async ({ page }: ITablePagination) => {
      const nextFrom = fromItems(page, size);
      const nextTo = toItems(nextFrom, size);
      await refreshTickets({
        from: nextFrom,
        to: nextTo,
      });
    },
    [refreshTickets, size],
  );

  const { data: lastTicket, refresh: refreshLastTicket } = useAsync(
    async () => {
      const { data, error } = await supabase
        .from('tickets')
        .select<string, Pick<ITicket, 'ticket_number'>>('ticket_number')
        .order('ticket_number', { ascending: false })
        .limit(1)
        .single();
      if (error) {
        throw error;
      }
      return data.ticket_number;
    },
  );

  const refresh = useCallback(
    async () => Promise.all([refreshTickets(), refreshLastTicket()]),
    [refreshTickets, refreshLastTicket],
  );

  const createTicket = useCallback(
    async (historyItem: IHistoryItem) => {
      const { error } = await supabase
        .from('tickets')
        .insert<ITicket>(toTicket(historyItem));
      await refresh();
      if (error) {
        throw error;
      }
    },
    [refresh],
  );

  const deleteTicket = useCallback(
    async (ticketId: number) => {
      const { error } = await supabase
        .from('tickets')
        .delete()
        .eq('id', ticketId);
      await refresh();
      if (error) {
        throw error;
      }
    },
    [refresh],
  );

  const updateState = useCallback(
    async (ticketId: string, state: TicketState) => {
      const { error } = await supabase
        .from('tickets')
        .update({ state })
        .eq('id', ticketId);
      await refreshTickets();
      if (error) {
        throw error;
      }
    },
    [],
  );

  return {
    tickets,
    lastTicket,
    totalTickets: totalTickets || 0,
    createTicket,
    deleteTicket,
    updateState,
    loadTickets,
  };
};
