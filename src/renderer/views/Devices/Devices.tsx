import { Stack, Typography, Box, CircularProgress, Alert } from '@mui/joy';
import { FC, useCallback, useState } from 'react';
import { Devices as DevicesIcon, ErrorOutline } from '@mui/icons-material';
import { DeviceCard } from '../../components/DeviceCard';
import { useDevicesApi } from '../../hooks/useSupabase';
import { useAsync } from '../../hooks/useAsync';
import { useAppState } from '../../providers/AppStateProvider';
import { useLoader } from '../../hooks/useLoader';
import { ConfirmModal } from '../../components/ConfirmModal';
import { IDevice } from '../../../types/device';

export const DevicesView: FC = () => {
  const { currentUser } = useAppState();
  const devicesApi = useDevicesApi();
  const { data: devices = [], refresh, loading: isLoading } = useAsync(devicesApi.getAllDevices, undefined, []);
  const { waitFor } = useLoader();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<IDevice | null>(null);

  const handleDeleteClick = useCallback((device: IDevice) => {
    setDeviceToDelete(device);
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deviceToDelete?.id) return;

    try {
      await waitFor(devicesApi.deleteDevice(deviceToDelete.id));
      setDeleteModalOpen(false);
      setDeviceToDelete(null);
      await refresh();
    } catch (error) {
      alert(`Error al eliminar dispositivo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }, [deviceToDelete, devicesApi, waitFor, refresh]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteModalOpen(false);
    setDeviceToDelete(null);
  }, []);

  const isAdmin = currentUser?.isAdmin;

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack className="devices-view" spacing={2}>
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Eliminar dispositivo"
        content={
          <Typography>
            ¿Está seguro que desea eliminar el dispositivo &quot;{deviceToDelete?.name || 'sin nombre'}&quot;?
          </Typography>
        }
      />

      <Stack direction="row" alignItems="center" gap={1}>
        <DevicesIcon sx={{ fontSize: '2rem' }} />
        <Typography level="h1">Dispositivos Registrados</Typography>
      </Stack>

      <Typography level="body-sm">
        Lista de todos los dispositivos que han accedido a la aplicación.
        {!isAdmin && ' Solo los administradores pueden eliminar dispositivos.'}
      </Typography>

      {devices.length === 0 ? (
        <Alert startDecorator={<ErrorOutline />} color="neutral">
          No hay dispositivos registrados.
        </Alert>
      ) : (
        <Stack gap={2}>
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onDelete={() => handleDeleteClick(device)}
              canDelete={isAdmin}
            />
          ))}
        </Stack>
      )}

      <Box display="flex" justifyContent="flex-end">
        <Typography level="body-sm" color="neutral">
          Total: {devices.length} {devices.length === 1 ? 'dispositivo' : 'dispositivos'}
        </Typography>
      </Box>
    </Stack>
  );
};
