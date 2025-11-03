import { FC, useState } from 'react';
import { Modal, ModalClose, ModalDialog, DialogTitle, DialogContent, Typography, Input, Button, Stack } from '@mui/joy';
import { IModalState } from '../hooks/useModalState';
import { Caption } from './ui/Caption';

export interface DeviceNameModalProps {
  state: IModalState;
  onDoItLater?: () => void;
  onAccept?: (name: string) => void;
}

export const DeviceNameModal: FC<DeviceNameModalProps> = ({ state, onDoItLater, onAccept }) => {
  const [name, setName] = useState('');
  return (
    <Modal open={state.isOpen} onClose={state.close}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>Nombre del PC.</DialogTitle>
        <DialogContent>
          <Typography>Asigna un nombre a este equipo para identificarlo fácilmente.</Typography>
          <Caption>Por ejemplo: PC de mostrador, PC de oficina, etc.</Caption>

          <Stack direction="column" gap={1} mt={2}>
            <Input autoFocus sx={{ flex: 1 }} onChange={(e) => setName(e.target.value)} />
            <Button
              size="sm"
              onClick={() => {
                onAccept?.(name);
              }}
            >
              Aceptar
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              size="sm"
              onClick={() => {
                onDoItLater?.();
                state.close();
              }}
            >
              Hacerlo mas tarde
            </Button>
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
