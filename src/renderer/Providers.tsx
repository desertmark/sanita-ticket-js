import { CssVarsProvider } from '@mui/joy';
import { FC, PropsWithChildren } from 'react';
import { AppStateProvider } from './providers/AppStateProvider';
import { ConfigStateProvider } from './providers/ConfigStateProvider';
import { theme } from './theme';
import { StoreProvider } from './providers/StoreProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CssVarsProvider theme={theme}>
      <ConfigStateProvider>
        <StoreProvider>
          <AppStateProvider>{children}</AppStateProvider>
        </StoreProvider>
      </ConfigStateProvider>
    </CssVarsProvider>
  );
};
