import { CssVarsProvider } from '@mui/joy';
import { FC, PropsWithChildren } from 'react';
import { AppStateProvider } from './providers/AppStateProvider';
import { ConfigStateProvider } from './providers/ConfigStateProvider';
import { NotificationProvider } from './providers/NotificationProvider';
import { theme } from './theme';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CssVarsProvider theme={theme}>
      <NotificationProvider>
        <ConfigStateProvider>
          <AppStateProvider>{children}</AppStateProvider>
        </ConfigStateProvider>
      </NotificationProvider>
    </CssVarsProvider>
  );
};
