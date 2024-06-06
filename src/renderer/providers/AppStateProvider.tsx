import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useHashedStorage } from '../hooks/useHashedStorage';

export interface IAppStateContextType {
  isAdmin: boolean;
  isPasswordDialogOpen: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  setAdminPassword: (password: string) => Promise<void>;
  isAdminPasswordHash: (password: string) => Promise<boolean>;
  openPasswordDialog: () => void;
  closePasswordDialog: () => void;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

const defaults: IAppStateContextType = {
  isAdmin: false,
  isPasswordDialogOpen: false,
  setIsAdmin: () => {},
  setAdminPassword: () => Promise.resolve(),
  isAdminPasswordHash: () => Promise.resolve(false),
  openPasswordDialog: () => {},
  closePasswordDialog: () => {},
  login: () => Promise.resolve(),
  logout: () => {},
};

const AppStateContext = createContext<IAppStateContextType>(defaults);

export const useAppState = (): IAppStateContextType =>
  useContext(AppStateContext);

export const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    set: setAdminPassword,
    isEqual: isAdminPasswordHash,
    hash,
  } = useHashedStorage('password');
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] =
    useState<boolean>(false);

  const openPasswordDialog = () => setIsPasswordDialogOpen(true);
  const closePasswordDialog = () => setIsPasswordDialogOpen(false);

  const login = useCallback(
    async (password: string) => {
      const isValid = await isAdminPasswordHash(password);
      if (isValid) {
        setIsAdmin(true);
        return;
      }
      throw Error('Contraseña incorrecta');
    },
    [isAdminPasswordHash],
  );

  const logout = useCallback(() => {
    setIsAdmin(false);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (!hash) {
      setAdminPassword('admin');
    }
  });

  const value = useMemo(
    () => ({
      isAdmin,
      isPasswordDialogOpen,
      setIsAdmin,
      setAdminPassword,
      isAdminPasswordHash,
      openPasswordDialog,
      closePasswordDialog,
      login,
      logout,
    }),
    [
      isAdmin,
      isAdminPasswordHash,
      isPasswordDialogOpen,
      login,
      setAdminPassword,
      logout,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
