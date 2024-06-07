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
  Input,
} from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppState } from '../providers/AppStateProvider';
import { PasswordInput } from './PasswordInput';

export interface ILoginValues {
  email: string;
  password: string;
}

export const LoginModal: FC<unknown> = () => {
  const { isPasswordDialogOpen, closePasswordDialog, login } = useAppState();
  const formik = useFormik<ILoginValues>({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    async onSubmit(values: ILoginValues) {
      try {
        await login(values.email, values.password);
        closePasswordDialog();
      } catch (err: Error | any) {
        formik.setErrors({ email: err.message });
      }
    },
  });
  const handleClose = () => {
    closePasswordDialog();
    formik.resetForm();
  };
  return (
    <Modal
      open={isPasswordDialogOpen}
      onClose={handleClose}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          formik.submitForm();
        }
      }}
    >
      <ModalDialog>
        <ModalClose />
        <DialogTitle>Iniciar session</DialogTitle>
        <DialogContent>
          Inicia session como administrador para acceder a las configuraciones y
          funciones avanzadas.
        </DialogContent>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <Input
                onChange={(e) => formik.setFieldValue('email', e.target.value)}
                autoFocus
                required
                type="email"
                placeholder="email"
              />
            </FormControl>
            <FormControl>
              <PasswordInput
                onChange={(e) =>
                  formik.setFieldValue('password', e.target.value)
                }
                required
                type="password"
                placeholder="password"
              />
            </FormControl>
            {Object.values(formik.errors).map((error) => (
              <FormHelperText>
                <InfoOutlined color="danger" />
                <Typography color="danger" fontSize="small">
                  {error}
                </Typography>
              </FormHelperText>
            ))}
            <Box display="flex" flexGrow={1} sx={{ gap: 1 }}>
              <Button type="submit" fullWidth>
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
        </form>
      </ModalDialog>
    </Modal>
  );
};
