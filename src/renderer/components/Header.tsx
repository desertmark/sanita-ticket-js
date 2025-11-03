import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Avatar, CircularProgress, Divider, IconButton, Sheet, Stack, Tooltip, Typography } from '@mui/joy';
import { BrowserUpdated, Logout, Menu } from '@mui/icons-material';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import pkg from '../../../package.json';
import { useAppState } from '../providers/AppStateProvider';
import logoSrc from '../../../assets/icon.png';
import { RoundIconButton } from './ui/RoundButton';
import { useLoader } from '../hooks/useLoader';
import { useModalState } from '../hooks/useModalState';
import { DeviceNameModal } from './DeviceNameModal';

export const Header: FC<PropsWithChildren<{ onClickMenu: () => void }>> = ({ onClickMenu }) => {
  const { logout, currentUser, deviceInfo, setDeviceName } = useAppState();
  const { isLoading, waitFor } = useLoader();
  const [doItLater, setDoItLater] = useState(false);
  const deviceName = deviceInfo?.name;
  const deviceId = deviceInfo?.id;
  const deviceNameModal = useModalState();
  useEffect(() => {
    if (deviceId && !deviceName && !doItLater) {
      deviceNameModal.open();
    } else {
      // deviceNameModal.close();
    }
  }, [deviceName, deviceNameModal, doItLater, deviceId]);
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
          py: 1.5,
        }}
      >
        <ErrorButton />
        <DeviceNameModal
          state={deviceNameModal}
          onDoItLater={() => setDoItLater(true)}
          onAccept={async (name) => {
            await setDeviceName(name);
            deviceNameModal.close();
          }}
        />
        <Stack direction="row" gap={3}>
          <IconButton variant="outlined" onClick={onClickMenu}>
            <Menu />
          </IconButton>
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
          <>
            <Typography sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} level="title-md">
              {currentUser?.email}
            </Typography>
            <Avatar />
            {currentUser?.isAdmin && (
              <Tooltip variant="soft" title="Buscar actualizaciones" color="primary">
                <RoundIconButton
                  color="primary"
                  variant="soft"
                  onClick={() => waitFor(window.electron.app.checkForUpdates())}
                >
                  {isLoading ? <CircularProgress /> : <BrowserUpdated />}
                </RoundIconButton>
              </Tooltip>
            )}
            <Tooltip variant="soft" title="Cerrar session" color="danger">
              <RoundIconButton color="danger" onClick={logout} variant="soft">
                <Logout />
              </RoundIconButton>
            </Tooltip>
          </>
        </Stack>
      </Sheet>
      <Divider />
    </>
  );
};
