import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Box, Divider, Grid, Typography, styled, useTheme } from '@mui/joy';
import { IProduct, ITicketLine } from '../../types';
import logo from '../../../assets/ticket-logo.png';
import { useNow } from '../hooks/useNow';
import { today } from '../../utils';
import { useTotal } from '../hooks/useTotal';
import { useTicketNumber } from '../hooks/useTicketNumber';

export interface TicketProps {
  lines: ITicketLine[];
  ticketNumber: number;
}

export const Ticket: FC<TicketProps> = ({ lines, ticketNumber = 0 }) => {
  const now = useNow();
  const total = useTotal(lines);
  const ticketNumberFormatted = useTicketNumber(ticketNumber);
  const noData = lines?.length === 0;
  return (
    <TicketContainer id="ticket">
      <Header>
        <img alt="logo" src={logo} />
        <HeaderData>
          <HeaderCol>
            <HeaderText>Nombre:</HeaderText>
            <HeaderText>Fecha:</HeaderText>
            <HeaderText>Hora:</HeaderText>
            <HeaderText>Ticket N°: </HeaderText>
          </HeaderCol>
          <HeaderCol>
            <HeaderText>Consumidor</HeaderText>
            <HeaderText>{today()}</HeaderText>
            <HeaderText>{now}</HeaderText>
            <HeaderText>{ticketNumberFormatted}</HeaderText>
          </HeaderCol>
        </HeaderData>
      </Header>
      <Body>
        <Grid container>
          <BodyHeader />
          <BodyDivider />
          {noData && <NoData />}
          {lines?.map((l) => (
            <Line
              key={`ticket-line-${l.product.codigo}`}
              descripcion={l.product.descripcion}
              precio={l.product.precio}
              cantidad={l.quantity}
            />
          ))}
        </Grid>
      </Body>
      <Divider sx={{ backgroundColor: 'black', my: 1 }} />
      <Footer total={total} />
    </TicketContainer>
  );
};

const NoData: FC = () => (
  <Grid xsOffset={4} xs={12}>
    <Typography sx={{ color: 'black' }}>No hay productos</Typography>
  </Grid>
);

const Line: FC<{ descripcion: string; precio: number; cantidad: number }> = ({
  descripcion,
  precio,
  cantidad,
}) => (
  <Grid container xs={12}>
    <Grid xs={7}>
      <BodyCell>{descripcion}</BodyCell>
    </Grid>
    <Grid xs={3}>
      <BodyCell>${precio?.toFixed(2)}</BodyCell>
    </Grid>
    <Grid xs={2}>
      <BodyCell textAlign="center">{cantidad}</BodyCell>
    </Grid>
  </Grid>
);

const Footer: FC<{ total: number }> = ({ total }) => (
  <Box display="flex" gap={1} justifyContent="flex-end">
      <FooterTitle>Total:</FooterTitle>
      <FooterValue>${total?.toFixed(2)}</FooterValue>
  </Box>
);

const BodyHeader: FC = () => (
  <Grid container xs={12}>
    <Grid xs={7}>
      <HeaderText>Descripcion</HeaderText>
    </Grid>
    <Grid xs={3}>
      <HeaderText>P.U.</HeaderText>
    </Grid>
    <Grid xs={2}>
      <HeaderText>Cant</HeaderText>
    </Grid>
  </Grid>
);

const BodyDivider: FC = () => (
  <Grid xs={12} id="ticket-divider">
    <Divider sx={{ backgroundColor: 'black', my: 2 }} />
  </Grid>
);

const TicketContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  backgroundColor: 'white',
  padding: theme.spacing(2),
  border: '1px solid black',
  borderRadius: theme.radius.sm,
  width: "48mm",
  padding: theme.spacing(.5),
}));

const Header = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const HeaderData = styled(Box)(() => ({
  display: 'flex',
}));

const HeaderCol = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  ...theme.typography['body-xs'],
  color: 'black',
}));

const Body = styled(Box)(({ theme }) => ({
  mt: theme.spacing(2),
}));

const BodyCell = styled(Typography)(({ theme }) => ({
  fontSize: 8,
  color: 'black',
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography['title-sm'],
  fontWeight: 'bold',
  color: 'black',
}));

const FooterValue = styled(Typography)(({ theme }) => ({
  ...theme.typography['body-sm'],
  fontWeight: 'bold',
  color: 'black',
}));
