import { Card, Typography, Stack, Chip, IconButton, Box } from '@mui/joy';
import { Delete, Computer, Person, AccessTime } from '@mui/icons-material';
import { FC } from 'react';
import { IDevice } from '../../types/device';
import { Caption } from './ui/Caption';

export interface DeviceCardProps {
  device: IDevice;
  onDelete?: (id: string) => void;
  canDelete?: boolean;
}

export const DeviceCard: FC<DeviceCardProps> = ({ device, onDelete, canDelete }) => {
  const formatDate = (date?: string) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack gap={2} flex={1}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Computer color="primary" />
            <Typography level="title-lg" fontWeight="bold">
              {device.name || 'Sin nombre'}
            </Typography>
          </Stack>

          <Stack gap={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <Caption>ID:</Caption>
              <Typography level="body-sm" fontFamily="monospace">
                {device.id}
              </Typography>
            </Box>

            {device.hostname && (
              <Box display="flex" alignItems="center" gap={1}>
                <Caption>Hostname:</Caption>
                <Typography level="body-sm">{device.hostname}</Typography>
              </Box>
            )}

            {device.username && (
              <Box display="flex" alignItems="center" gap={1}>
                <Person sx={{ fontSize: '1rem' }} />
                <Typography level="body-sm">{device.username}</Typography>
              </Box>
            )}

            <Stack direction="row" gap={1} flexWrap="wrap">
              {device.platform && (
                <Chip size="sm" variant="soft" color="neutral">
                  {device.platform}
                </Chip>
              )}
              {device.arch && (
                <Chip size="sm" variant="soft" color="neutral">
                  {device.arch}
                </Chip>
              )}
              {device.release && (
                <Chip size="sm" variant="soft" color="neutral">
                  {device.release}
                </Chip>
              )}
            </Stack>

            {device.created_at && (
              <Box display="flex" alignItems="center" gap={1}>
                <AccessTime sx={{ fontSize: '1rem' }} />
                <Caption>Registrado:</Caption>
                <Typography level="body-xs">{formatDate(device.created_at)}</Typography>
              </Box>
            )}
          </Stack>
        </Stack>

        {canDelete && onDelete && (
          <IconButton variant="soft" color="danger" size="sm" onClick={() => onDelete(device.id!)}>
            <Delete />
          </IconButton>
        )}
      </Stack>
    </Card>
  );
};
