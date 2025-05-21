import { FC, ReactNode } from 'react';
import { Modal, ModalClose, ModalDialog, DialogTitle, Stack, Button, Box } from '@mui/joy';

export interface IConfirmModalProps {
  title?: ReactNode;
  content?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}
export const ConfirmModal: FC<IConfirmModalProps> = ({ title, content, isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      open={!!isOpen}
      onClose={onClose}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          onClose?.();
        }
      }}
    >
      <ModalDialog>
        <ModalClose />
        {title && <DialogTitle>{title}</DialogTitle>}

        <Stack spacing={2}>
          {content && (
            <Box justifyContent="center" display="flex">
              {content}
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button fullWidth color="primary" onClick={onConfirm}>
              Aceptar
            </Button>
            <Button fullWidth color="neutral" onClick={onClose}>
              Cancelar
            </Button>
          </Box>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
