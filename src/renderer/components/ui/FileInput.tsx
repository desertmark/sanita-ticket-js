import { AccountCircle, FolderOpen, History } from '@mui/icons-material';
import { Button, Divider, Stack, Typography } from '@mui/joy';
import { ChangeEventHandler, FC, useRef } from 'react';
import { Caption } from './Caption';

export interface FileInputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  path?: string;
  openTime?: string;
  openBy?: string;
}

export const FileInput: FC<FileInputProps> = ({ onChange, path, openTime, openBy }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <input ref={ref} onChange={onChange} type="file" style={{ display: 'none' }} />

        <Button
          startDecorator={<FolderOpen />}
          sx={{ borderRadius: 99, minWidth: 'max-content', height: 32 }}
          variant="soft"
          onClick={() => ref.current?.click()}
        >
          Seleccionar archivo
        </Button>
        <Typography
          level="body-sm"
          sx={{ mb: 3, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', m: 0 }}
        >
          {path ?? 'Ningún archivo seleccionado'}
        </Typography>
      </Stack>
      {openTime && (
        <>
          <Divider sx={{ m: 1 }} />
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Stack direction="row" gap={1} alignItems="center" sx={{ ml: 1 }}>
                <History fontSize="small" />
                <Caption>Abierto el {openTime && new Date(openTime).toLocaleDateString('es-AR')}</Caption>
              </Stack>
              <Stack direction="row" gap={1} alignItems="center" sx={{ ml: 1 }}>
                <AccountCircle fontSize="small" />
                <Caption>por {openBy}</Caption>
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};
