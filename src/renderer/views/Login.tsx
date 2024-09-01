import { Box, Typography } from '@mui/joy';
import { FC } from 'react';
import { ReceiptLongRounded } from '@mui/icons-material';
import { LoginForm } from '../components/LoginForm';

export const LoginView: FC = () => {
  return (
    <Box className="login-view">
      <Box
        display="flex"
        gap={1}
        alignItems="center"
        justifyContent="center"
        mt={10}
      >
        <Typography fontSize={28} display="flex">
          <ReceiptLongRounded />
        </Typography>
        <Typography fontSize={28}>Sanita ticket</Typography>
      </Box>
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
