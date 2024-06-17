/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { useSupabaseEmailLogin } from '../hooks/useSupabase';
import { ILoader, useLoader } from '../hooks/useLoader';

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
}

const defaults: IAppStateContextType = {
  isPasswordDialogOpen: false,
  isAuthenticated: () => false,
  openPasswordDialog: () => {},
  closePasswordDialog: () => {},
  login: () => Promise.resolve(),
  logout: () => {},
  loader: { isLoading: false, waitFor: () => {} },
};

const AppStateContext = createContext<IAppStateContextType>(defaults);

export const useAppState = (): IAppStateContextType =>
  useContext(AppStateContext);

// PROVIDER
export const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
  // Utils
  const navigate = useNavigate();
  const { login: supabaseEmailLogin, logout: supabaseEmailLogout } =
    useSupabaseEmailLogin();
  const loader = useLoader();
  // States
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] =
    useState<boolean>(false);

  // Methods
  const openPasswordDialog = () => setIsPasswordDialogOpen(true);
  const closePasswordDialog = () => setIsPasswordDialogOpen(false);

  const login = useCallback(
    async (email: string, password: string) => {
      const user = await supabaseEmailLogin(email, password);
      console.log(user);
      setCurrentUser(user);
    },
    [supabaseEmailLogin],
  );

  const logout = useCallback(async () => {
    await supabaseEmailLogout();
    setCurrentUser(undefined);
    navigate('/');
  }, [navigate, supabaseEmailLogout]);

  const isAuthenticated = useCallback(() => !!currentUser, [currentUser]);

  const value = useMemo(
    () => ({
      isPasswordDialogOpen,
      currentUser,
      loader,
      isAuthenticated,
      openPasswordDialog,
      closePasswordDialog,
      login,
      logout,
    }),
    [currentUser, isAuthenticated, isPasswordDialogOpen, login, logout],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
