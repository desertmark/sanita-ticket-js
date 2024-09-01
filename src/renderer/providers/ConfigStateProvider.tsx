/* eslint-disable react/jsx-no-useless-fragment */
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useAsync } from '../hooks/useAsync';
import { IConfig } from '../../main/modules/app.controller';

export interface IConfigStateContextType extends Partial<IConfig> {}

const defaults: IConfigStateContextType = {
  supabaseAnnonKey: '',
  supabaseUrl: '',
};

const ConfigStateContext = createContext<IConfigStateContextType>(defaults);

export const useConfigState = (): IConfigStateContextType =>
  useContext(ConfigStateContext);

// PROVIDER
export const ConfigStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: config } = useAsync(() => window.electron.app.getConfig());

  const value = useMemo(
    () => ({
      supabaseAnnonKey: config?.supabaseAnnonKey,
      supabaseUrl: config?.supabaseUrl,
    }),
    [config?.supabaseAnnonKey, config?.supabaseUrl],
  );

  return (
    <ConfigStateContext.Provider value={value}>
      {config ? children : <></>}
    </ConfigStateContext.Provider>
  );
};
