import { FC } from 'react';
import { Box, Typography } from '@mui/joy';
import { money } from '../../utils';

export const Summary: FC<{ lines: Array<{ label: string; amount: number }> }> = ({ lines }) => {
  return (
    <>
      {lines.map((l) => (
        <Box display="flex" justifyContent="space-between" gap={1} key={l.label}>
          <Typography fontWeight="light" level="title-sm">
            {l.label}
          </Typography>
          <Typography level="title-md">{money(l.amount)}</Typography>
        </Box>
      ))}
    </>
  );
};
