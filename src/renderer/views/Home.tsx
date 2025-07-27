import {
  Box,
  Typography,
  Button,
  Input,
  Tooltip,
  Chip,
  FormControl,
  FormLabel,
  IconButton,
  CircularProgress,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Checkbox,
  Stack,
  Alert,
  ColorPaletteProp,
} from '@mui/joy';
import { FC, useRef } from 'react';
import { FileOpen, Cancel, Search, CheckCircleOutlined, ErrorOutline } from '@mui/icons-material';
import { ProductsDataGrid } from '../components/ProductsDataGrid/ProductsDataGrid';
import { ProductsSelectionDataGrid } from '../components/ProductsDataGrid/ProductSelectionDataGrid';
import { Ticket } from '../components/Ticket';
import './print.scss';
import { useHomeState } from '../providers/HomeStateProvider';
import { minMaxFormatter, money, ProductCalculator } from '../../utils';
import { useAppState } from '../providers/AppStateProvider';
import { ViewTicketModal } from '../components/ViewTicketModal';
import { PayMethodSelector } from '../components/PayMethodSelector';
import { IHistoryItem, PayMethod, PayMethodClass } from '../../types';
import { useModalState } from '../hooks/useModalState';

export const HomeView: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { currentTicket, setCurrentTicket } = useAppState();
  const state = useHomeState();
  const openTime = state?.openFile?.openTime ? new Date(state?.openFile?.openTime!)?.toLocaleDateString() : '';
  const ticketModal = useModalState();
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
  return (
    <Box className="home-view">
      <ViewTicketModal
        ticket={currentTicket!}
        onClose={handleCloseTicketModal}
        isOpen={ticketModal.isOpen}
        onPrint={() => state.printTicket()}
      />
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography level="h2">Productos</Typography>
          <Box display="flex" gap={1}>
            <Typography level="title-sm">Archivo abierto:</Typography>
            <Typography level="body-sm">{state.openFile?.path}</Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Typography level="title-sm">Abierto el:</Typography>
            <Typography level="body-sm">{openTime}</Typography>
          </Box>
        </Box>

        <input ref={ref} onChange={state.handleFileOpen} type="file" style={{ display: 'none' }} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'column', lg: 'row' },
            gap: 1,
          }}
        >
          <Box>
            <Box display="flex" gap={1} justifyContent="space-between">
              <Input
                size="sm"
                placeholder="Buscar"
                startDecorator={<Search />}
                sx={{ mb: 2, flex: 1 }}
                onChange={state.onSearch}
              />
              <Box display="flex" gap={1} height="fit-content" width="max-content">
                <Tooltip
                  variant="soft"
                  color="primary"
                  title="Click para abrir una nueva lista de productos."
                  placement="top"
                >
                  <Button size="sm" startDecorator={<FileOpen />} onClick={() => ref.current?.click()}>
                    Abrir
                  </Button>
                </Tooltip>
                {/* <Tooltip variant="soft" title="Click para limpiar la lista de productos." placement="top">
                  <Button size="sm" startDecorator={<Cancel />} onClick={() => state.clearList()} color="primary">
                    Limpiar lista
                  </Button>
                </Tooltip> */}
              </Box>
            </Box>
            <ProductsDataGrid />
          </Box>
          <Box display="flex" flexDirection="column" flex={1} gap={2}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" gap={1}>
                <Typography level="h4">Ticket Numero:</Typography>
                <Chip color="primary" variant="solid" size="md">
                  {state.ticketNumber}
                </Chip>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Tooltip
                  variant="soft"
                  title="Haga click para confirmar la venta y comenzar con un nuevo tiket."
                  color="success"
                  placement="top"
                >
                  <IconButton onClick={handleTicketConfirmation} color="success">
                    <CheckCircleOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip variant="soft" title="Click para limpiar la lista de presupuesto y el ticket." placement="top">
                  <IconButton onClick={() => state.clear()} color="danger">
                    <Cancel />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            {state.summary.total < 0 && (
              <Alert startDecorator={<ErrorOutline />} color="warning">
                El total del ticket es menor que cero
              </Alert>
            )}
            <FormControl>
              <FormLabel>Descuento %</FormLabel>
              <Input
                style={{ flex: 1 }}
                size="sm"
                placeholder="Descuento a aplicar en la venta"
                type="number"
                value={minMaxFormatter(state.discount, 0, 100) || undefined}
                onChange={(e) => state.setDiscount(Number(e.target.value))}
                slotProps={{
                  input: {
                    max: 100,
                    min: 0,
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Metodo de pago</FormLabel>
              <PayMethodSelector onChange={state.setPayMethod} value={state.payMethod} />
            </FormControl>
            <Typography>¿Devuelve productos?: {state.returnTicket?.ticket?.id ? `Si` : `No`}</Typography>
            <FormControl>
              <FormLabel>Devolución ticket nro: </FormLabel>
              <Input
                style={{ flex: 1 }}
                size="sm"
                placeholder="Introduzca el numero de ticket a devolver..."
                onChange={(e) => state.onReturnTicketChange(parseInt(e.target.value))}
                endDecorator={state.isLoadingReturnTicket ? <CircularProgress size="sm" /> : undefined}
                disabled={state.isLoadingReturnTicket}
                slotProps={{
                  input: {
                    ref: state.returnTicket.ref,
                  },
                }}
              />
            </FormControl>
            {state.returnTicket && (
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
                    const isCard = [PayMethod.CREDIT, PayMethod.DEBIT].includes(
                      state.returnTicket?.ticket?.pay_method as PayMethod,
                    );
                    const precio = isCard ? line.product.precioTarjeta : line.product.precio;
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
                                <Typography level="body-xs">Precio unitario: {money(precio, 2)}</Typography>
                                <Tooltip
                                  variant="soft"
                                  title={`Precio ${isCard ? 'con tarjeta' : 'efectivo o transferencia'}`}
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

            <Typography>Productos a comprar:</Typography>
            <ProductsSelectionDataGrid
              lines={state.lines}
              onDeleted={state.onProductDeleted}
              onQuantityChanged={state.onQuantityChanged}
            />
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Typography fontWeight="bold" level="title-md">
                Subtotal:
              </Typography>
              <Typography level="title-md">{money(state.summary.subTotal, 2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Typography fontWeight="bold" level="title-md">
                Credito por devolución:
              </Typography>
              <Typography level="title-md">{money(state.returnTicket.totalCredit, 2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Typography fontWeight="bold" level="title-md">
                Descuento:
              </Typography>
              <Typography level="title-md">{money(state.summary.discountAmount, 2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Typography fontWeight="bold" level="title-md">
                Total:
              </Typography>
              <Typography level="title-md" color={state.summary.total < 0 ? 'danger' : undefined}>
                {money(state.summary.total, 2)}
              </Typography>
            </Box>
          </Box>
          <Box display="flex">
            <Ticket
              lines={state.lines}
              ticketNumber={state.ticketNumber}
              payMethod={state.payMethod}
              summary={state.summary}
              returnTicket={state.returnTicket}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
