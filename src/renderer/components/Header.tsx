import { FC, PropsWithChildren } from 'react';
import { Sheet, Typography } from '@mui/joy';
import { ColorSchemeToggle } from './ColorSchemeToggle';

export const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Sheet
      component="header"
      className="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: {
          xs: 2,
          md: 6,
        },
        py: {
          xs: 2,
          sm: 2,
          md: 3,
        },
      }}
    >
      <Typography level="body-lg">Sanita ticket</Typography>
      <ColorSchemeToggle />
    </Sheet>
  );
};
