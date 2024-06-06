import { InfoOutlined } from '@mui/icons-material';
import { Box, Button, FormHelperText, Typography } from '@mui/joy';
import { FC } from 'react';
import { useConfigState } from '../hooks/useConfigState';
import { PasswordInput } from '../components/PasswordInput';

export const ConfigView: FC = () => {
  const { passwordChangeForm } = useConfigState();
  return (
    <Box className="config-view">
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2">Configuraciones</Typography>
      </Box>

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          maxWidth: 300,
        }}
      >
        <Typography level="title-md">
          Cambiar contraseña de administrador
        </Typography>

        <form onSubmit={passwordChangeForm.handleSubmit}>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: 300,
            }}
          >
            <PasswordInput
              name="password"
              value={passwordChangeForm.values.password}
              placeholder="Nueva contraseña"
              onChange={passwordChangeForm.handleChange}
              error={
                !!passwordChangeForm.errors?.password &&
                passwordChangeForm.touched.password
              }
            />
            <PasswordInput
              name="confirmPassword"
              value={passwordChangeForm.values.confirmPassword}
              placeholder="Confirmar nueva contraseña"
              onChange={passwordChangeForm.handleChange}
              error={
                !!passwordChangeForm.errors?.confirmPassword &&
                passwordChangeForm.touched.confirmPassword
              }
            />

            {Object.values(passwordChangeForm.errors || {})?.map((error) => (
              <FormHelperText key={`${error}-${Math.random()}`}>
                <InfoOutlined />
                {error}
              </FormHelperText>
            ))}

            <Button
              type="submit"
              variant="solid"
              color="primary"
              sx={{ maxWidth: 120 }}
            >
              Aplicar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
