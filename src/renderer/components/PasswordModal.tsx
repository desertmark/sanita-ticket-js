import { FC, useState } from 'react';
import {
  Modal,
  ModalClose,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Stack,
  FormControl,
  Button,
  Box,
} from '@mui/joy';
import { useAppState } from '../providers/AppStateProvider';
import { PasswordInput } from './PasswordInput';

export const PasswordModal: FC<unknown> = () => {
  const { isPasswordDialogOpen, closePasswordDialog, login } = useAppState();
  const [password, setPassword] = useState('');

  return (
    <Modal open={isPasswordDialogOpen} onClose={closePasswordDialog}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>Iniciar session como administrador</DialogTitle>
        <DialogContent>
          Inicia session como administrador para acceder a las configuraciones y
          funciones avanzadas.
        </DialogContent>

        <Stack spacing={2}>
          <FormControl>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              type="password"
              placeholder="password"
            />
          </FormControl>
          <Box display="flex" flexGrow={1} sx={{ gap: 1 }}>
            <Button
              onClick={async () => {
                try {
                  await login(password);
                  closePasswordDialog();
                } catch (error: Error | any) {
                  console.error(error);
                  alert(error.message || 'Error desconocido');
                }
              }}
              type="submit"
              fullWidth
            >
              Aceptar
            </Button>
            <Button
              color="neutral"
              onClick={closePasswordDialog}
              type="reset"
              fullWidth
            >
              Cancelar
            </Button>
          </Box>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
