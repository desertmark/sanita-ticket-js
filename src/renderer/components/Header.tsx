import { FC, PropsWithChildren } from 'react';
import { Avatar, Divider, IconButton, Sheet, Stack, Tooltip, Typography } from '@mui/joy';
import { Logout, Menu } from '@mui/icons-material';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import pkg from '../../../package.json';
import { useAppState } from '../providers/AppStateProvider';
import logoSrc from '../../../assets/icon.png';
import { RoundIconButton } from './ui/RoundButton';

export const Header: FC<PropsWithChildren<{ onClickMenu: () => void }>> = ({ onClickMenu }) => {
  const { isAuthenticated, logout, currentUser } = useAppState();
  return (
    <>
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
        <Stack direction="row" gap={3}>
          {isAuthenticated() && (
            <IconButton variant="outlined" onClick={onClickMenu}>
              <Menu />
            </IconButton>
          )}
          <Stack direction="row" gap={1} alignItems="center">
            <Typography fontSize={28} display="flex">
              <Avatar src={logoSrc} />
            </Typography>
            <Typography fontSize={{ xs: 16, md: 28 }}>Sanita ticket</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" gap={1} alignItems="center">
          <Typography level="title-sm">v{pkg.version}</Typography>
          <ColorSchemeToggle />
          {isAuthenticated() && (
            <>
              <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} level="title-md">
                {currentUser?.email}
              </Typography>
              <Avatar />
              <Tooltip variant="soft" title="Cerrar session" color="danger">
                <RoundIconButton color="danger" onClick={logout} variant="soft">
                  <Logout />
                </RoundIconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      </Sheet>
      <Divider />
    </>
  );
};
