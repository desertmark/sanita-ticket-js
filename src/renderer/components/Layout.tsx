import { Box, useColorScheme } from '@mui/joy';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Main } from './Main';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { Header } from './Header';
export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { mode, setMode } = useColorScheme();
  useEffect(() => {
    setMode('dark');
  }, []);
  return (
    <Box
      className="layout"
      sx={{ display: 'flex', minHeight: '100dvh', flexDirection: 'column' }}
    >
      <Header />
      <Main>{children}</Main>
    </Box>
  );
};
