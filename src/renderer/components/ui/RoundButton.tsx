import { Button, IconButton, styled } from '@mui/joy';

export interface RoundButtonProps {
  autoAspectRatio?: boolean;
}

export const RoundButton = styled(Button)<RoundButtonProps>(({ theme, autoAspectRatio }) => ({
  borderRadius: 99999,
  fontSize: theme.fontSize.xs,
  fontWeight: 'normal',
  aspectRatio: autoAspectRatio ? 'none' : '1 / 1',
}));

export const RoundIconButton = styled(IconButton)(() => ({
  aspectRatio: '1 / 1',
  borderRadius: 99999,
}));
