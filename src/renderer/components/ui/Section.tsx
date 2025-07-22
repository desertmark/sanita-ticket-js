import { Card, Typography } from '@mui/joy';
import { FC, PropsWithChildren } from 'react';

export const Section: FC<PropsWithChildren<{ title: string }>> = ({ children, title }) => {
  return (
    <Card variant="outlined2">
      <Typography level="title-lg" fontWeight={400}>
        {title}
      </Typography>
      {children}
    </Card>
  );
};
