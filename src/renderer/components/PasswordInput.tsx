import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Input, InputTypeMap } from '@mui/joy';
import { FC, useState } from 'react';

export const PasswordInput: FC<InputTypeMap['props']> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      type={isVisible ? 'text' : 'password'}
      endDecorator={
        isVisible ? (
          <VisibilityOff
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsVisible(false)}
          />
        ) : (
          <Visibility
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsVisible(true)}
          />
        )
      }
    />
  );
};
