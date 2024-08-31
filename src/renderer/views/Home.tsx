import { Box, Typography, Button, Input, Tooltip, Chip } from '@mui/joy';
import { FC, useRef } from 'react';
import {
  FileOpen,
  Cancel,
  Search,
  CheckCircleOutlined,
} from '@mui/icons-material';
import { ProductsDataGrid } from '../components/ProductsDataGrid/ProductsDataGrid';
import { ProductsSelectionDataGrid } from '../components/ProductsDataGrid/ProductSelectionDataGrid';
import { Ticket } from '../components/Ticket';
import './print.scss';
import { useHomeState } from '../hooks/useHomeState';
import { PayMethod } from '../components/PayMethod';
import { minMaxFormatter } from '../../utils';
import { useAppState } from '../providers/AppStateProvider';
import { ViewTicketModal } from '../components/ViewTicketModal';

export const HomeView: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { currentTicket } = useAppState();
  const state = useHomeState();
  const openTime = state?.openFile?.openTime
    ? new Date(state?.openFile?.openTime!)?.toLocaleDateString()
    : '';
  return (
    <Box className="home-view">
      <ViewTicketModal
        ticket={currentTicket!}
        onClose={state.closeViewTicketModal}
        isOpen={state.isViewTicketModalOpen}
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
          <Box display="flex" sx={{ gap: 1 }}>
            <Typography level="title-sm">Archivo abierto:</Typography>
            <Typography level="body-sm">{state.openFile?.path}</Typography>
          </Box>
          <Box display="flex" sx={{ gap: 1 }}>
            <Typography level="title-sm">Abierto el:</Typography>
            <Typography level="body-sm">{openTime}</Typography>
          </Box>
        </Box>
        <input
          ref={ref}
          onChange={state.handleFileOpen}
          type="file"
          style={{ display: 'none' }}
        />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Typography level="h2">Ticket Numero:</Typography>
          <Chip color="primary" variant="solid" size="lg">
            {state.ticketNumber}
          </Chip>
          <Tooltip
            title="Click para limpiar la lista de productos."
            placement="top"
          >
            <Button
              startDecorator={<Cancel />}
              onClick={() => state.clearList()}
              color="neutral"
            >
              Limpiar lista
            </Button>
          </Tooltip>
          <Tooltip
            color="primary"
            title="Click para abrir una nueva lista de productos."
            placement="top"
          >
            <Button
              startDecorator={<FileOpen />}
              onClick={() => ref.current?.click()}
            >
              Abrir
            </Button>
          </Tooltip>
          <Tooltip
            title="Haga click para confirmar la venta y comenzar con un nuevo tiket."
            color="success"
            placement="top"
          >
            <Button
              startDecorator={<CheckCircleOutlined />}
              onClick={state.save}
              color="success"
            >
              Confirmar venta
            </Button>
          </Tooltip>
          <Tooltip
            title="Click para limpiar la lista de presupuesto y el ticket."
            placement="top"
          >
            <Button
              startDecorator={<Cancel />}
              onClick={() => state.clear()}
              color="neutral"
            >
              Limpiar prespuesto
            </Button>
          </Tooltip>
        </Box>
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
            <Input
              size="sm"
              placeholder="Buscar"
              startDecorator={<Search />}
              sx={{ mb: 2 }}
              onChange={state.onSearch}
            />
            <ProductsDataGrid
              rows={state.filter ? state.filtered : state.rows}
              onProductSelected={state.onProductSelected}
            />
          </Box>
          <Box display="flex" flexDirection="column" flex={1}>
            <Box display="flex" gap={1}>
              <Input
                style={{ flex: 1 }}
                size="sm"
                placeholder="Descuento %"
                sx={{ mb: 2 }}
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
              <Box mt={0.5}>
                <PayMethod
                  onChange={state.setPayMethod}
                  value={state.payMethod}
                />
              </Box>
            </Box>
            <ProductsSelectionDataGrid
              lines={state.lines}
              onDeleted={state.onProductDeleted}
              onQuantityChanged={state.onQuantityChanged}
            />
          </Box>
          <Box display="flex">
            <Ticket
              lines={state.lines}
              ticketNumber={state.ticketNumber}
              payMethod={state.payMethod}
              discount={state.discount}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
