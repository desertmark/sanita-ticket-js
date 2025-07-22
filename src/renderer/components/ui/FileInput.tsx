import { Close, History } from '@mui/icons-material';
import { Button, Divider, IconButton, Stack, Typography } from '@mui/joy';
import { ChangeEventHandler, FC, useRef } from 'react';
import { Caption } from './Caption';

export interface FileInputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
  path?: string;
  openTime?: string;
}

export const FileInput: FC<FileInputProps> = ({ onChange, path, openTime, onClear }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <input ref={ref} onChange={onChange} type="file" style={{ display: 'none' }} />

        <Button
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
            <Stack direction="row" gap={1} alignItems="center" sx={{ ml: 1 }}>
              <History fontSize="small" />
              <Caption>Abierto el {openTime && new Date(openTime).toLocaleDateString('es-AR')}</Caption>
            </Stack>
            <IconButton variant="plain" sx={{ borderRadius: 99, p: 0 }} onClick={onClear}>
              <Close sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        </>
      )}
    </Stack>
  );
};
