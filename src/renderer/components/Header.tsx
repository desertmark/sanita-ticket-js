import { FC, PropsWithChildren } from 'react';
import { Box, IconButton, Sheet, Typography } from '@mui/joy';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import pkg from '../../../package.json';
import { Menu, ReceiptLongRounded } from '@mui/icons-material';

export const Header: FC<PropsWithChildren<{ onClickMenu: () => void }>> = ({
  onClickMenu,
}) => {
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
      <Box display="flex" gap={3}>
        <IconButton variant="outlined" onClick={onClickMenu}>
          <Menu />
        </IconButton>
        <Box display="flex" gap={1} alignItems="center">
          <Typography fontSize={28} display="flex">
            <ReceiptLongRounded />
          </Typography>
          <Typography fontSize={28}>Sanita ticket</Typography>
        </Box>
      </Box>
      <Box display="flex" gap={1} alignItems="center">
        <Typography level="title-sm">v{pkg.version}</Typography>
        <ColorSchemeToggle />
      </Box>
    </Sheet>
  );
};
