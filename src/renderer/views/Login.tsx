import { Avatar, Stack, Box, Typography } from '@mui/joy';
import { FC } from 'react';
import logoSrc from '../../../assets/icon.png';
import { LoginForm } from '../components/LoginForm';

export const LoginView: FC = () => {
  return (
    <Box className="login-view">
      <Stack gap={1} alignItems="center" justifyContent="center" mt={10}>
        <Avatar src={logoSrc} sx={{ width: 200, height: 200 }} />
        <Typography fontSize={28}>Sanita ticket</Typography>
      </Stack>
      <Typography level="h4" sx={{ textAlign: 'center', mt: 5 }}>
        Iniciar sesion
      </Typography>
      <Typography level="body-sm" sx={{ textAlign: 'center' }}>
        Inicia sesion con tu cuenta para acceder
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};
