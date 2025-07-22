import { FC } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import { IconButtonProps } from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import { RoundIconButton } from './ui/RoundButton';

export const ColorSchemeToggle: FC<IconButtonProps> = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <RoundIconButton
      id="toggle-mode"
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      {mode === 'light' && <DarkModeRoundedIcon />}
      {mode === 'dark' && <LightModeIcon />}
    </RoundIconButton>
  );
};
