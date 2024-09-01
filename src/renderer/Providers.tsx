import { CssVarsProvider, extendTheme } from '@mui/joy';
import { FC, PropsWithChildren } from 'react';
import { AppStateProvider } from './providers/AppStateProvider';
import { ConfigStateProvider } from './providers/ConfigStateProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          background: {
            body: '#eee',
          },
        },
      },
    },
  });
  return (
    <CssVarsProvider theme={theme}>
      <ConfigStateProvider>
        <AppStateProvider>{children}</AppStateProvider>
      </ConfigStateProvider>
    </CssVarsProvider>
  );
};
