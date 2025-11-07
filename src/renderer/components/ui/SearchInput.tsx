import { Search } from '@mui/icons-material';
import { Input, InputProps } from '@mui/joy';
import { FC } from 'react';
import { debounce } from '../../../utils';

export const SearchInput: FC<InputProps> = ({ sx, onChange, ...props }) => {
  return (
    <Input
      startDecorator={<Search sx={{ fontSize: '1.5rem' }} />}
      sx={{
        borderRadius: 99,
        p: 1.5,
        fontSize: '1rem',
        flexShrink: 0,
        ...sx,
      }}
      onChange={debounce(onChange!, 300)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};
