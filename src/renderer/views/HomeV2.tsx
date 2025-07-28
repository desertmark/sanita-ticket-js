import {
  Box,
  Typography,
  Input,
  Tooltip,
  FormLabel,
  CircularProgress,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Checkbox,
  Stack,
  Alert,
  ColorPaletteProp,
  Drawer,
  Chip,
} from '@mui/joy';
import { FC } from 'react';
import {
  Cancel,
  Search,
  ErrorOutline,
  AttachMoney,
  CurrencyExchange,
  CreditCard,
  CheckCircle,
  Print,
  Add,
  QrCode2,
} from '@mui/icons-material';
import { Ticket } from '../components/Ticket';
import './print.scss';
import { useHomeState } from '../providers/HomeStateProvider';
import { minMaxFormatter, money, ProductCalculator } from '../../utils';
import { useAppState } from '../providers/AppStateProvider';
import { ViewTicketModal } from '../components/ViewTicketModal';
import { ProductList } from '../components/ProductsDataGrid/ProductList';
import { IHistoryItem, PayMethod, PayMethodClass, TicketState } from '../../types';
import { FileInput } from '../components/ui/FileInput';
import { FormControlInline } from '../components/ui/FormControlInline';
import { Section } from '../components/ui/Section';
import { Caption } from '../components/ui/Caption';
import { ButtonSelector } from '../components/ui/ButtonSelector';
import { ProductsSelectionTable } from '../components/ProductsDataGrid/ProductSelectionTable';
import { Summary } from '../components/Summary';
import { RoundButton, RoundIconButton } from '../components/ui/RoundButton';
import { useModalState } from '../hooks/useModalState';
import { Pagination } from '../components/ui/Pagination';

export const HomeViewV2: FC = () => {
  const { currentTicket, setCurrentTicket } = useAppState();
  const state = useHomeState();
  const ticketModal = useModalState();
  const productsDrawer = useModalState();

  const handleTicketConfirmation = async () => {
    try {
      await state.save();
      ticketModal.open();
    } catch (error) {
      alert(`Error al generar el ticket: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleCloseTicketModal = () => {
    ticketModal.close();
    if (currentTicket?.id) {
      setCurrentTicket({} as IHistoryItem);
    }
  };

  const viewTicket: IHistoryItem = currentTicket?.id
    ? currentTicket
    : {
        id: state.ticketNumber,
        ticketLines: state.lines,
        payMethod: state.payMethod,
        discount: state.discount,
        returnTicket: state.returnTicket,
        date: new Date().getTime(),
        subTotal: state.summary.subTotal,
        total: state.summary.total,
        state: TicketState.confirmed,
      };
  return (
    <Stack className="home-view" mt={3} gap={3} direction="row">
      <ViewTicketModal
        isPreview={!currentTicket?.id}
        ticket={viewTicket}
        onClose={handleCloseTicketModal}
        isOpen={ticketModal.isOpen}
        onPrint={() => state.printTicket()}
      />
      {/* PRODUCTS LIST SIDE */}
      <Drawer open={productsDrawer.isOpen} anchor="bottom" size="lg" onClose={productsDrawer.close}>
        <Stack p={3} gap={3} minHeight="100%">
          <HomeProducts />
        </Stack>
      </Drawer>
      <Stack maxWidth="30vw" gap={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
        <HomeProducts />
      </Stack>
      {/* TICKET CREATION SIDE */}
      <Stack direction="column" flex={1} gap={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography level="h2" mt={1}>
            Nuevo ticket
          </Typography>
          <Stack direction="row" gap={1} alignItems="center" sx={{ display: { xs: 'none', md: 'flex', lg: 'none' } }}>
            <RoundButton
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={productsDrawer.open}
              autoAspectRatio
              variant="soft"
              startDecorator={<Add />}
            >
              Agregar producto
            </RoundButton>
            <RoundButton
              startDecorator={<Print />}
              autoAspectRatio
              onClick={ticketModal.open}
              variant="soft"
              color="neutral"
            >
              Vista Previa
            </RoundButton>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center" sx={{ display: { xs: 'flex', md: 'none', lg: 'none' } }}>
            <RoundIconButton
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={productsDrawer.open}
              variant="soft"
              color="primary"
            >
              <Add />
            </RoundIconButton>
            <RoundIconButton onClick={ticketModal.open} variant="soft" color="neutral">
              <Print />
            </RoundIconButton>
          </Stack>
        </Box>
        {state.summary.total < 0 && (
          <Alert startDecorator={<ErrorOutline />} color="warning">
            El total del ticket es menor que cero
          </Alert>
        )}
        <Section title="Descuento y metodo de pago">
          <FormControlInline justify>
            <FormLabel>Procentaje de descuento</FormLabel>
            <Input
              style={{ width: 120 }}
              size="sm"
              placeholder="0"
              type="number"
              value={minMaxFormatter(state.discount, 0, 100) || undefined}
              onChange={(e) => state.setDiscount(Number(e.target.value))}
              endDecorator="%"
              slotProps={{
                input: {
                  max: 100,
                  min: 0,
                },
              }}
            />
          </FormControlInline>
          <Box mt={2}>
            <ButtonSelector
              value={state.payMethod}
              options={[
                {
                  value: PayMethod.CASH,
                  text: PayMethod.CASH,
                  icon: <AttachMoney />,
                },
                {
                  value: PayMethod.QR,
                  text: PayMethod.QR,
                  icon: <QrCode2 />,
                },
                {
                  value: PayMethod.TRANSFER,
                  text: PayMethod.TRANSFER,
                  icon: <CurrencyExchange />,
                },
                {
                  value: PayMethod.DEBIT,
                  text: PayMethod.DEBIT,
                  icon: <CreditCard />,
                },
                {
                  value: PayMethod.CREDIT,
                  text: PayMethod.CREDIT,
                  icon: <CreditCard />,
                },
              ]}
              onChange={(e) => state.setPayMethod(e.target.value as PayMethod)}
            />
          </Box>
        </Section>
        {/* <Section title="Metodo de pago">
          <Box>
            <ButtonSelector
              value={state.payMethod}
              options={[
                {
                  value: PayMethod.CASH,
                  text: PayMethod.CASH,
                  icon: <AttachMoney />,
                },
                {
                  value: PayMethod.QR,
                  text: PayMethod.QR,
                  icon: <QrCode2 />,
                },
                {
                  value: PayMethod.TRANSFER,
                  text: PayMethod.TRANSFER,
                  icon: <CurrencyExchange />,
                },
                {
                  value: PayMethod.DEBIT,
                  text: PayMethod.DEBIT,
                  icon: <CreditCard />,
                },
                {
                  value: PayMethod.CREDIT,
                  text: PayMethod.CREDIT,
                  icon: <CreditCard />,
                },
              ]}
              onChange={(e) => state.setPayMethod(e.target.value as PayMethod)}
            />
          </Box>
        </Section> */}
        <Section title="Devolucion de productos">
          <Caption>¿Devuelve productos?: {state.returnTicket?.ticket?.id ? `Si` : `No`}</Caption>
          <FormControlInline justify>
            <FormLabel>Introduzca el numero de ticket a devolver: </FormLabel>
            <Input
              style={{ width: 100 }}
              size="sm"
              startDecorator="#"
              type="number"
              onChange={(e) => state.onReturnTicketChange(parseInt(e.target.value))}
              endDecorator={state.isLoadingReturnTicket ? <CircularProgress size="sm" /> : undefined}
              disabled={state.isLoadingReturnTicket}
              slotProps={{
                input: {
                  ref: state.returnTicket.ref,
                },
              }}
            />
          </FormControlInline>
          {state.returnTicket?.ticket?.id && (
            <Box>
              <FormLabel>Seleccione los productos a devolver:</FormLabel>
              {(state.returnTicket?.ticket?.discount || 0) > 0 && (
                <Typography level="body-xs" color="warning">
                  Los montos de este ticket incluyen un descuento del {state.returnTicket.ticket?.discount}%.
                </Typography>
              )}
              <List>
                {state.returnTicket?.ticket?.lines.map((line) => {
                  const returnTicket = state.alreadyReturnLines.find((l) => l.product.id === line.product.id);
                  const payMethod = PayMethodClass[state.returnTicket?.ticket?.pay_method as PayMethod];
                  const returnAmount = ProductCalculator.returnAmount(state.returnTicket.ticket!, line);
                  return (
                    <ListItem key={`${state.returnTicket.ticket?.id}-${line.product.id}`}>
                      <ListItemDecorator>
                        <Checkbox
                          disabled={!!returnTicket}
                          onChange={(e) => {
                            if (e.target.checked) {
                              state.returnTicket.addReturnProduct(line);
                            } else {
                              state.returnTicket.removeReturnProduct(line);
                            }
                          }}
                        />
                      </ListItemDecorator>
                      <ListItemContent>
                        <Stack>
                          <Typography level="body-xs">
                            {line.product.codigo} - {line.product.descripcion}
                          </Typography>
                          <Typography level="body-xs">Cantidad: {line.quantity}</Typography>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" gap={1}>
                              <Typography level="body-xs">Precio unitario: {money(line.product.precio, 2)}</Typography>
                              <Tooltip
                                variant="soft"
                                title={`Pagado con ${payMethod.name.toLocaleLowerCase()}`}
                                color={payMethod.color as ColorPaletteProp}
                                placement="top"
                              >
                                <payMethod.Icon sx={{ fontSize: 16 }} color={payMethod.color} />
                              </Tooltip>
                            </Box>
                            <Typography level="body-xs">Total: {money(returnAmount, 2)}</Typography>
                          </Box>
                          {!!returnTicket && (
                            <Alert color="warning" size="sm">
                              Esta producto ya fué devuelto en el ticket nro: {returnTicket.return_ticket_id}
                            </Alert>
                          )}
                        </Stack>
                      </ListItemContent>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          )}
        </Section>
        <Section title="Productos seleccionados">
          <ProductsSelectionTable
            lines={state.lines}
            onDeleted={state.onProductDeleted}
            onQuantityChanged={state.onQuantityChanged}
            payMethod={state.payMethod}
          />
        </Section>
        <Summary
          lines={[
            {
              label: 'Subtotal',
              amount: state.summary.subTotal,
            },
            {
              label: 'Credito por devolución',
              amount: state.returnTicket.totalCredit,
            },
            {
              label: 'Descuento',
              amount: state.summary.discountAmount,
            },
            {
              label: 'Total',
              amount: state.summary.total,
            },
          ]}
        />

        <Stack direction="row" justifyContent="flex-end" gap={2} mt={4}>
          <Tooltip variant="soft" title="Click para limpiar la lista de presupuesto y el ticket." placement="top">
            <RoundButton
              autoAspectRatio
              startDecorator={<Cancel />}
              variant="soft"
              onClick={() => state.clear()}
              color="neutral"
            >
              Cancelar
            </RoundButton>
          </Tooltip>
          <Tooltip
            variant="soft"
            title="Haga click para confirmar la venta y comenzar con un nuevo tiket."
            color="primary"
            placement="top"
          >
            <RoundButton
              autoAspectRatio
              startDecorator={<CheckCircle />}
              variant="soft"
              onClick={handleTicketConfirmation}
              color="primary"
            >
              Confirmar
            </RoundButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex' } }}>
        <Ticket
          lines={state.lines}
          ticketNumber={state.ticketNumber}
          payMethod={state.payMethod}
          summary={state.summary}
          returnTicket={state.returnTicket}
        />
      </Box>
    </Stack>
  );
};

const HomeProducts: FC = () => {
  const state = useHomeState();
  return (
    <>
      <Input
        size="sm"
        placeholder="Buscar productos"
        startDecorator={<Search sx={{ fontSize: '1.5rem' }} />}
        color="primary"
        sx={{
          borderRadius: 99,
          p: 1.5,
          fontSize: '1rem',
          flexShrink: 0,
        }}
        onChange={state.onSearch}
      />
      <FileInput onChange={state.handleFileOpen} path={state.openFile?.path} openTime={state.openFile?.openTime} />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography level="title-lg">Productos:</Typography>
        <Chip variant="soft" color="primary" size="sm">
          {state.productsCount} encontrados
        </Chip>
      </Stack>
      <Stack gap={2}>
        <ProductList products={state.products} onProductSelected={state.onProductSelected} />
        <Pagination
          currentPage={state.page}
          onPageChange={(page) => state.setPage(page)}
          totalPages={Math.ceil(state.productsCount / state.pageSize)}
        />
      </Stack>
    </>
  );
};
