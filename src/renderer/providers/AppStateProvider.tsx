/* eslint-disable import/no-cycle */
import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoader, useLoader } from '../hooks/useLoader';
import { IHistoryItem } from '../../types';
import { useAuthApi } from '../hooks/useSupabase';

export interface IUser {
  id: string;
  email: string;
  role: string;
  isAdmin: boolean;
}

export interface IAppStateContextType {
  currentUser?: IUser;
  isAuthenticated: () => boolean;
  isPasswordDialogOpen: boolean;
  openPasswordDialog: () => void;
  closePasswordDialog: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loader: ILoader;
  currentTicket?: IHistoryItem;
  setCurrentTicket: (ticket: IHistoryItem) => void;
}

const defaults: IAppStateContextType = {
  isPasswordDialogOpen: false,
  isAuthenticated: () => false,
  openPasswordDialog: () => {},
  closePasswordDialog: () => {},
  login: () => Promise.resolve(),
  logout: () => {},
  loader: { isLoading: false, waitFor: async (task: Promise<any>) => task },
  setCurrentTicket: () => undefined,
};

const AppStateContext = createContext<IAppStateContextType>(defaults);

export const useAppState = (): IAppStateContextType => useContext(AppStateContext);

// PROVIDER
export const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
  // Utils
  const navigate = useNavigate();
  const loader = useLoader();
  // States
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState<boolean>(false);
  const [currentTicket, setCurrentTicket] = useState<IHistoryItem>();
  // Apis
  const { login: supaLogin, logout: supaLogout, loadSession: supaLoadSession } = useAuthApi();
  // Methods
  const openPasswordDialog = () => setIsPasswordDialogOpen(true);
  const closePasswordDialog = () => setIsPasswordDialogOpen(false);

  const login = useCallback(
    async (email: string, password: string) => {
      const user = await supaLogin(email, password);
      console.log(user);
      setCurrentUser(user);
    },
    [supaLogin, setCurrentUser],
  );

  const logout = useCallback(async () => {
    await supaLogout();
    setCurrentUser(undefined);
    navigate('/');
  }, [navigate, supaLogout]);

  const isAuthenticated = useCallback(() => !!currentUser, [currentUser]);

  // Effects
  useEffect(() => {
    const load = async () => {
      const user = await supaLoadSession();
      if (user) {
        setCurrentUser(user);
      }
    };
    load();
  }, [supaLoadSession]);

  const value = useMemo(
    () => ({
      isPasswordDialogOpen,
      currentUser,
      loader,
      currentTicket,
      isAuthenticated,
      openPasswordDialog,
      closePasswordDialog,
      login,
      logout,
      setCurrentTicket,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isPasswordDialogOpen,
      currentUser?.id,
      loader.isLoading,
      loader.waitFor,
      currentTicket,
      isAuthenticated,
      login,
      logout,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};
