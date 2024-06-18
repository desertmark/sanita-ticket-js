import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  useColorScheme,
} from '@mui/joy';
import { FC, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Main } from './Main';
import { Header } from './Header';
import { useToggle } from '../hooks/useToggle';
import { Sidebar } from './Sidebar';
import { Backdrop } from './Backdrop';
import { useAppState } from '../providers/AppStateProvider';
import { Ticket } from './Ticket';
import '../views/print.scss';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { setMode } = useColorScheme();
  const [isSidebarOpen, toggleSidebar] = useToggle();
  const { loader, currentTicket } = useAppState();
  useEffect(() => {
    setMode('dark');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      className="layout"
      sx={{ display: 'flex', minHeight: '100dvh', flexDirection: 'column' }}
    >
      {currentTicket &&
        createPortal(
          <Box id="ticket-wrapper" display="flex">
            <Ticket
              lines={currentTicket.ticketLines}
              ticketNumber={currentTicket.id}
              payMethod={currentTicket.payMethod}
              discount={currentTicket.discount}
            />
          </Box>,
          document.body,
        )}
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
