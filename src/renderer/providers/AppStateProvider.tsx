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
}

const defaults: IAppStateContextType = {
  isPasswordDialogOpen: false,
  isAuthenticated: () => false,
  openPasswordDialog: () => {},
  closePasswordDialog: () => {},
  login: () => Promise.resolve(),
  logout: () => {},
};

const AppStateContext = createContext<IAppStateContextType>(defaults);

export const useAppState = (): IAppStateContextType =>
  useContext(AppStateContext);

export const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const navigate = useNavigate();

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] =
    useState<boolean>(false);

  const openPasswordDialog = () => setIsPasswordDialogOpen(true);
  const closePasswordDialog = () => setIsPasswordDialogOpen(false);

  const { login: supabaseEmailLogin, logout: supabaseEmailLogout } =
    useSupabaseEmailLogin();

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
