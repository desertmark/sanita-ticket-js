import { FC, PropsWithChildren } from 'react';
import { Box, Button, IconButton, Sheet, Tooltip, Typography } from '@mui/joy';
import { Logout, Menu, ReceiptLongRounded } from '@mui/icons-material';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import pkg from '../../../package.json';
import { useAppState } from '../providers/AppStateProvider';
// import { LoginModal } from './LoginModal';

export const Header: FC<PropsWithChildren<{ onClickMenu: () => void }>> = ({
  onClickMenu,
}) => {
  const { isAuthenticated, logout, currentUser } = useAppState();
  return (
    <Sheet
      component="header"
      className="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: {
          xs: 2,
          md: 6,
        },
        py: {
          xs: 2,
          sm: 2,
          md: 3,
        },
      }}
    >
      {/* <LoginModal /> */}
      <Box display="flex" gap={3}>
        {isAuthenticated() && (
          <IconButton variant="outlined" onClick={onClickMenu}>
            <Menu />
          </IconButton>
        )}
        <Box display="flex" gap={1} alignItems="center">
          <Typography fontSize={28} display="flex">
            <ReceiptLongRounded />
          </Typography>
          <Typography fontSize={28}>Sanita ticket</Typography>
        </Box>
      </Box>
      <Box display="flex" gap={1} alignItems="center">
        {isAuthenticated() && (
          <>
            <Typography level="title-md">{currentUser?.email}</Typography>
            <Tooltip
              title="Haz click para cerrar la session de administrador"
              color="danger"
            >
              <Button endDecorator={<Logout />} color="danger" onClick={logout}>
                Cerrar sesión
              </Button>
            </Tooltip>
          </>
        )}
        <Typography level="title-sm">v{pkg.version}</Typography>
        <ColorSchemeToggle />
      </Box>
    </Sheet>
  );
};
