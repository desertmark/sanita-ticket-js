import { Button, IconButton, styled } from '@mui/joy';

export const RoundButton = styled(Button)(({ theme }) => ({
  borderRadius: 99999,
  fontSize: theme.fontSize.xs,
  fontWeight: 'normal',
  aspectRatio: '1 / 1',
}));

export const RoundIconButton = styled(IconButton)(() => ({
  aspectRatio: '1 / 1',
  borderRadius: 99999,
}));
