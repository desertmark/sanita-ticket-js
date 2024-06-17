import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useColorScheme,
} from '@mui/joy';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Main } from './Main';
import { Header } from './Header';
import { useToggle } from '../hooks/useToggle';
import { Sidebar } from './Sidebar';
import { Backdrop } from './Backdrop';
import { useAppState } from '../providers/AppStateProvider';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { setMode } = useColorScheme();
  const [isSidebarOpen, toggleSidebar] = useToggle();
  const { loader } = useAppState();
  useEffect(() => {
    setMode('dark');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      className="layout"
      sx={{ display: 'flex', minHeight: '100dvh', flexDirection: 'column' }}
    >
      {loader.isLoading && (
        <Backdrop>
          <CircularProgress color="primary" size="lg" variant="solid" />
          <Typography level="h4" sx={{ ml: 2 }}>
            Cargando...
          </Typography>
        </Backdrop>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Header onClickMenu={toggleSidebar} />
      <Main>{children}</Main>
    </Box>
  );
};
