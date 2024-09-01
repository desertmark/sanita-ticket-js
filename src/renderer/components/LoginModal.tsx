import { FC, useState } from 'react';
import {
  Modal,
  ModalClose,
  ModalDialog,
  DialogTitle,
  DialogContent,
} from '@mui/joy';
import { useAppState } from '../providers/AppStateProvider';
import { LoginForm } from './LoginForm';

export interface ILoginValues {
  email: string;
  password: string;
}

export const LoginModal: FC<unknown> = () => {
  const { isPasswordDialogOpen, closePasswordDialog } = useAppState();
  return (
    <Modal open={isPasswordDialogOpen} onClose={closePasswordDialog}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>Iniciar session</DialogTitle>
        <DialogContent>
          Inicia session como administrador para acceder a las configuraciones y
          funciones avanzadas.
        </DialogContent>

        <LoginForm
          onSubmit={closePasswordDialog}
          onCancel={closePasswordDialog}
        />
      </ModalDialog>
    </Modal>
  );
};
