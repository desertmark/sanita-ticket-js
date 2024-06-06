import { Box, useColorScheme } from '@mui/joy';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Main } from './Main';
import { Header } from './Header';
import { useToggle } from '../hooks/useToggle';
import { Sidebar } from './Sidebar';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { setMode } = useColorScheme();
  const [isSidebarOpen, toggleSidebar] = useToggle();

  useEffect(() => {
    setMode('dark');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      className="layout"
      sx={{ display: 'flex', minHeight: '100dvh', flexDirection: 'column' }}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Header onClickMenu={toggleSidebar} />
      <Main>{children}</Main>
    </Box>
  );
};
