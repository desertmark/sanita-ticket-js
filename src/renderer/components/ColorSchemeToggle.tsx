import { FC } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ColorSchemeToggle: FC<IconButtonProps> = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      {mode == 'light' && <DarkModeRoundedIcon />}
      {mode == 'dark' && <LightModeIcon />}
    </IconButton>
  );
};
