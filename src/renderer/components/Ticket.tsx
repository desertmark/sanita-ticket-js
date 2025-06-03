import { FC } from 'react';
import { Box, Divider, Grid, Typography, styled } from '@mui/joy';
import { SvgIconComponent } from '@mui/icons-material';
import logo from '../../../assets/ticket-logo.png';
import { useNow } from '../hooks/useNow';
import { money, today } from '../../utils';
import { useTicketNumber } from '../hooks/useTicketNumber';
import { ITicketSummary } from '../hooks/useTicketSummary';
import { usePayMethodIcon } from '../hooks/usePayMethodIcon';
import { ITicketLine, PayMethod } from '../../types/tickets';
import { IHistoryItem } from '../../types/history';

export interface TicketProps {
  lines: ITicketLine[];
  summary: ITicketSummary;
  ticketNumber: number;
  payMethod: PayMethod;
  returnTicket?: IHistoryItem['returnTicket'];
}
export const Ticket: FC<TicketProps> = ({ lines, ticketNumber, payMethod, summary, returnTicket }) => {
  const now = useNow();
  const ticketNumberFormatted = useTicketNumber(ticketNumber);
  const noData = lines?.length === 0;
  const PayMethodIcon = usePayMethodIcon(payMethod);
  return (
    <TicketContainer id="ticket">
      <Header>
        <img alt="logo" src={logo} />
        <HeaderText textAlign="center">CONSUMIDOR FINAL</HeaderText>
        <HeaderData>
          <HeaderCol>
            <HeaderText fontWeight="bold">Fecha:</HeaderText>
            <HeaderText fontWeight="bold">Hora:</HeaderText>
            <HeaderText fontWeight="bold">Ticket N°: </HeaderText>
          </HeaderCol>
          <HeaderCol>
            <HeaderText>{today()}</HeaderText>
            <HeaderText>{now}</HeaderText>
            <HeaderText>{ticketNumberFormatted}</HeaderText>
          </HeaderCol>
        </HeaderData>
      </Header>
      <Body>
        <Grid container>
          <BodyHeader />
          <TicketDivider />
          {noData && <NoData />}
          {lines?.map((l) => (
            <Line
              key={`ticket-line-${l.product.codigo}`}
              descripcion={l.product.descripcion}
              precio={l.product.precio}
              cantidad={l.quantity}
              importe={l.product.precio * l.quantity}
            />
          ))}
        </Grid>
        {returnTicket?.ticket?.id && (
          <>
            <TicketDivider />
            <HeaderText>DEVOLUCIONES:</HeaderText>
            <HeaderText>Ticket Nro. {returnTicket.ticket.id}</HeaderText>
            <Grid container>
              {returnTicket.returnProducts.map((p) => (
                <ReturnLine
                  key={`return-ticket-line-${p.line.product.codigo}`}
                  descripcion={p.line.product.descripcion}
                  cantidad={p.line.quantity}
                  importe={p.returnAmount}
                />
              ))}
            </Grid>
            <Box display="flex" justifyContent="flex-end">
              <HeaderText>Total devuelto: {money(returnTicket.totalCredit)}</HeaderText>
            </Box>
          </>
        )}
      </Body>

      <TicketDivider />
      <Footer summary={summary} payMethod={payMethod} PayMethodIcon={PayMethodIcon} />
    </TicketContainer>
  );
};

const NoData: FC = () => (
  <Grid xsOffset={4} xs={12}>
    <Typography sx={{ color: 'black' }}>No hay productos</Typography>
  </Grid>
);

const Line: FC<{
  descripcion: string;
  precio: number;
  cantidad: number;
  importe: number;
}> = ({ descripcion, precio, cantidad, importe }) => (
  <Grid container xs={12}>
    <Grid xs={2}>
      <BodyCell textAlign="center">{cantidad}</BodyCell>
    </Grid>
    <Grid xs={5}>
      <BodyCell>{descripcion}</BodyCell>
    </Grid>
    <Grid xs={2}>
      <BodyCell>{money(precio)}</BodyCell>
    </Grid>
    <Grid xs={3}>
      <BodyCell>{money(importe)}</BodyCell>
    </Grid>
  </Grid>
);

const ReturnLine: FC<{
  descripcion: string;
  cantidad: number;
  importe: number;
}> = ({ descripcion, cantidad, importe }) => (
  <Grid container xs={12}>
    <Grid xs={2}>
      <BodyCell textAlign="center">{cantidad}</BodyCell>
    </Grid>
    <Grid xs={7}>
      <BodyCell>{descripcion}</BodyCell>
    </Grid>
    <Grid xs={3}>
      <BodyCell>{money(importe)}</BodyCell>
    </Grid>
  </Grid>
);

const Footer: FC<{
  summary: ITicketSummary;
  payMethod: string;
  PayMethodIcon: SvgIconComponent;
}> = ({ summary, payMethod, PayMethodIcon }) => (
  <Box>
    {summary.discountAmount > 0 && (
      <>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <FooterText>Dto: {money(summary.discountAmount)}</FooterText>
          <FooterText>Subtotal: {money(summary.subTotal)}</FooterText>
        </Box>
        <TicketDivider />
      </>
    )}
    <Box display="flex" flexDirection="column">
      <Box display="flex" gap={1} justifyContent="flex-end">
        <FooterText fontWeight="bold">Total:</FooterText>
        <FooterText>{money(summary.total)}</FooterText>
      </Box>
      <TicketDivider />
      <Box display="flex" gap={0.5} alignItems="center" justifyContent="center">
        <PayMethodIcon style={{ fontSize: 18, color: 'black' }} />
        <FooterText>{payMethod}</FooterText>
      </Box>
    </Box>
    <Typography
      sx={{
        color: 'black',
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 10,
        m: 2,
      }}
    >
      Muchas gracias
    </Typography>
  </Box>
);

const BodyHeader: FC = () => (
  <Grid container xs={12}>
    <Grid xs={2}>
      <HeaderText>Cant</HeaderText>
    </Grid>
    <Grid xs={5}>
      <HeaderText>Concepto</HeaderText>
    </Grid>
    <Grid xs={2}>
      <HeaderText>C/U</HeaderText>
    </Grid>
    <Grid xs={3}>
      <HeaderText>Importe</HeaderText>
    </Grid>
  </Grid>
);

const TicketDivider: FC = () => (
  <Grid xs={12} id="ticket-divider">
    <Divider sx={{ backgroundColor: 'black', my: 1 }} />
  </Grid>
);

const TicketContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  backgroundColor: 'white',
  border: '1px solid black',
  borderRadius: theme.radius.sm,
  width: '48mm',
  padding: theme.spacing(0.5),
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
  fontSize: 10,
  color: 'black',
}));

const Body = styled(Box)(({ theme }) => ({
  mt: theme.spacing(2),
}));

const BodyCell = styled(Typography)(() => ({
  fontSize: 8,
  color: 'black',
}));

const FooterText = styled(Typography)(({ theme }) => ({
  ...theme.typography['body-sm'],
  fontSize: 13,
  color: 'black',
}));
