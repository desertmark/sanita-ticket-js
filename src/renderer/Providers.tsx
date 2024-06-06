import { CssVarsProvider } from '@mui/joy';
import { FC, PropsWithChildren } from 'react';
import { AppStateProvider } from './providers/AppStateProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CssVarsProvider>
      <AppStateProvider>{children}</AppStateProvider>
    </CssVarsProvider>
  );
};
