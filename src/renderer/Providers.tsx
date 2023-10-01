import { CssVarsProvider } from '@mui/joy';
import { FC, PropsWithChildren } from 'react';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <CssVarsProvider>{children}</CssVarsProvider>;
};
