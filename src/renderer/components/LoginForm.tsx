import { FC } from 'react';
import {
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

export const LoginForm: FC<any> = ({ onSubmit }) => {
  const { login, loader: appLoader } = useAppState();

  const formik = useFormik<ILoginValues>({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    async onSubmit(values: ILoginValues) {
      try {
        await appLoader.waitFor(login(values.email, values.password));
        onSubmit?.();
      } catch (err: Error | any) {
        formik.setErrors({ email: err.message });
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <Stack
        spacing={2}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            formik.submitForm();
          }
        }}
      >
        <FormControl>
          <Input
            onChange={(e) => formik.setFieldValue('email', e.target.value)}
            autoFocus
            required
            type="email"
            placeholder="E-mail"
          />
        </FormControl>
        <FormControl>
          <PasswordInput
            onChange={(e) => formik.setFieldValue('password', e.target.value)}
            required
            type="password"
            placeholder="Contraseña"
          />
        </FormControl>
        {Object.values(formik.errors).map((error) => (
          <FormHelperText key={error}>
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
        </Box>
      </Stack>
    </form>
  );
};
