import { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/joy';

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component="main"
      className="main-content"
      sx={{
        px: {
          xs: 2,
          md: 6,
        },
        pt: {
          xs: 'calc(12px + var(--Header-height))',
          sm: 'calc(12px + var(--Header-height))',
          md: 3,
        },
        pb: {
          xs: 2,
          sm: 2,
          md: 3,
        },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100dvh',
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
};
