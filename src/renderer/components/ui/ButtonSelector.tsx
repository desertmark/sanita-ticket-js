import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { ChangeEvent, FC, ReactNode } from 'react';

export const ButtonSelector: FC<{
  value: string;
  options?: { value: string; text?: string; icon: ReactNode }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, options, onChange }) => {
  return (
    <RadioGroup
      overlay
      onChange={onChange}
      value={value}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: 1.5,
        [`& .${radioClasses.checked}`]: {
          [`& .${radioClasses.action}`]: {
            inset: -1,
            border: '3px solid',
            borderColor: 'primary.500',
          },
        },
        [`& .${radioClasses.radio}`]: {
          display: 'contents',
          '& > svg': {
            zIndex: 2,
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            borderRadius: '50%',
          },
        },
      }}
    >
      {options?.map((o) => (
        <Sheet
          key={o.value}
          variant="outlined"
          color="primary"
          sx={(t) => ({
            width: '100%',
            borderRadius: 'md',
            boxShadow: 'sm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            p: 2,
            minWidth: 120,
            backgroundColor: value === o.value ? t.palette.primary.softBg : '',
          })}
        >
          <Radio id={o.value} value={o.value} sx={{ display: 'hidden' }} />
          {o.icon}
          <FormLabel htmlFor={o.value}>{o?.text || o.value}</FormLabel>
        </Sheet>
      ))}
    </RadioGroup>
  );
};
