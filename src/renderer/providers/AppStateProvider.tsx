/* eslint-disable import/no-cycle */
import { FC, PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoader, useLoader } from '../hooks/useLoader';
import { IHistoryItem } from '../../types';
import { useAuthApi, useMiscellaneousApi } from '../hooks/useSupabase';
import { IUser } from '../../types/auth';
import { useAsync } from '../hooks/useAsync';
import { IDevice } from '../../types/device';
import Sentry from '../libs/sentry';
export interface IAppStateContextType {
  currentUser?: IUser;
  deviceInfo?: IDevice;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loader: ILoader;
  currentTicket?: IHistoryItem;
  setCurrentTicket: (ticket: IHistoryItem) => void;
  setDeviceName: (name: string) => Promise<void>;
}

const defaults: IAppStateContextType = {
  isAuthenticated: () => false,
  login: () => Promise.resolve(),
  logout: () => {},
  loader: { isLoading: false, waitFor: async (task: Promise<any>) => task },
  setCurrentTicket: () => undefined,
  setDeviceName: () => Promise.resolve(),
};

const AppStateContext = createContext<IAppStateContextType>(defaults);

export const useAppState = (): IAppStateContextType => useContext(AppStateContext);

// PROVIDER
export const AppStateProvider: FC<PropsWithChildren> = ({ children }) => {
  // Utils
  const navigate = useNavigate();
  const loader = useLoader();
  const { waitFor } = loader;
  // States
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [currentTicket, setCurrentTicket] = useState<IHistoryItem>();
  const [storedDeviceInfo, setStoredDeviceInfo] = useState<IDevice>();
  const currentUserId = currentUser?.id;
  // Apis
  const { login: supaLogin, logout: supaLogout, loadSession: supaLoadSession } = useAuthApi();
  const { upsertDevice, getDeviceById } = useMiscellaneousApi();
  // Asyncs
  const { data: collectedDeviceInfo } = useAsync(() => window.electron.app.getDeviceInfo());
  // Methods
  const login = useCallback(
    async (email: string, password: string) => {
      const user = await supaLogin(email, password);
      console.log(user);
      setCurrentUser(user);
      Sentry.setUser(user);
    },
    [supaLogin, setCurrentUser],
  );

  const logout = useCallback(async () => {
    await supaLogout();
    setCurrentUser(undefined);
    navigate('/');
  }, [navigate, supaLogout]);

  const isAuthenticated = useCallback(() => !!currentUserId, [currentUserId]);
  const setDeviceName = useCallback(
    async (name: string) => {
      if (!storedDeviceInfo) {
        return;
      }
      const updatedDevice = { ...storedDeviceInfo, name };
      await waitFor(upsertDevice(updatedDevice));
      setStoredDeviceInfo(updatedDevice);
    },
    [storedDeviceInfo, upsertDevice, waitFor],
  );
  // Effects

  // Store / fetch device info
  useEffect(() => {
    if (!currentUserId || !collectedDeviceInfo) {
      return;
    }
    (async () => {
      try {
        const device = await waitFor(getDeviceById(collectedDeviceInfo.id!));
        if (!device) {
          await waitFor(upsertDevice(collectedDeviceInfo));
          setStoredDeviceInfo(collectedDeviceInfo);
          Sentry.setTags(collectedDeviceInfo as any);
        } else {
          setStoredDeviceInfo(device);
          Sentry.setTags(device as any);
        }
      } catch (error) {
        console.error('Error storing/fetching device info:', error);
      }
    })();
  }, [collectedDeviceInfo, currentUserId, upsertDevice, getDeviceById, waitFor]);

  // Restore session
  useEffect(() => {
    const load = async () => {
      const user = await supaLoadSession();
      if (user) {
        setCurrentUser(user);
        Sentry.setUser(user);
      }
    };
    load();
  }, [supaLoadSession]);

  const value = useMemo(
    () => ({
      currentUser,
      deviceInfo: storedDeviceInfo,
      loader,
      currentTicket,
      isAuthenticated,
      login,
      logout,
      setCurrentTicket,
      setDeviceName,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser?.id, loader.isLoading, loader.waitFor, currentTicket, isAuthenticated, login, logout],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};
