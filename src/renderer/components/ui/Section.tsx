import { Accordion, AccordionDetails, AccordionSummary, Card, Typography } from '@mui/joy';
import { FC, PropsWithChildren } from 'react';

export const Section: FC<PropsWithChildren<{ title: string }>> = ({ children, title }) => {
  return (
    <Card variant="outlined2" sx={{ p: 1.5 }}>
      <Accordion defaultExpanded>
        <AccordionSummary sx={{ button: { borderRadius: '4px', px: 0.5, py: 0.25 } }}>
          <Typography level="title-lg" fontWeight={400}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 1 }}>{children}</AccordionDetails>
      </Accordion>
    </Card>
  );
};
