import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
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
};

const AppStateContext = createContext<IAppStateContextType>(defaults);

export const useAppState = (): IAppStateContextType =>
  useContext(AppStateContext);

export const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { set: setAdminPassword, isEqual: isAdminPasswordHash } =
    useHashedStorage('password');
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

  const value = useMemo(
    () => ({
      isAdmin,
      setIsAdmin,
      isPasswordDialogOpen,
      setAdminPassword,
      isAdminPasswordHash,
      openPasswordDialog,
      closePasswordDialog,
      login,
    }),
    [
      isAdmin,
      isAdminPasswordHash,
      isPasswordDialogOpen,
      login,
      setAdminPassword,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
