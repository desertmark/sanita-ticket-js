import { FormControl, styled } from '@mui/joy';

export interface FormControlInlineProps {
  justify?: boolean;
}

export const FormControlInline = styled(FormControl)<FormControlInlineProps>(({ theme, justify }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: justify ? 'space-between' : 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(1),

  '& .MuiFormLabel-root': {
    margin: 0,
    alignSelf: 'center',
  },
}));
