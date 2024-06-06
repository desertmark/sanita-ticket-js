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
  FormHelperText,
  Typography,
} from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';
import { useAppState } from '../providers/AppStateProvider';
import { PasswordInput } from './PasswordInput';

export const PasswordModal: FC<unknown> = () => {
  const { isPasswordDialogOpen, closePasswordDialog, login } = useAppState();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await login(password);
      closePasswordDialog();
    } catch (err: Error | any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleClose = () => {
    closePasswordDialog();
    setError('');
  };
  return (
    <Modal
      open={isPasswordDialogOpen}
      onClose={handleClose}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          await handleLogin();
        }
      }}
    >
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
          {error && (
            <FormHelperText>
              <InfoOutlined color="danger" />
              <Typography color="danger" fontSize="small">
                {error}
              </Typography>
            </FormHelperText>
          )}
          <Box display="flex" flexGrow={1} sx={{ gap: 1 }}>
            <Button onClick={handleLogin} type="submit" fullWidth>
              Aceptar
            </Button>
            <Button
              color="neutral"
              onClick={handleClose}
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
