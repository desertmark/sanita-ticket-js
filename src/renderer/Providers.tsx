import { CssVarsProvider } from '@mui/joy';
import { FC, PropsWithChildren } from 'react';
import { AppStateProvider } from './providers/AppStateProvider';
import { ConfigStateProvider } from './providers/ConfigStateProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CssVarsProvider>
      <ConfigStateProvider>
        <AppStateProvider>{children}</AppStateProvider>
      </ConfigStateProvider>
    </CssVarsProvider>
  );
};
