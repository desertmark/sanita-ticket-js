import { Box, Typography, Button, Input } from '@mui/joy';
import { FC, useRef } from 'react';
import { FileOpen, Print, Cancel } from '@mui/icons-material';
import { ProductsDataGrid } from '../components/ProductsDataGrid/ProductsDataGrid';
import { ProductsSelectionDataGrid } from '../components/ProductsDataGrid/ProductSelectionDataGrid';
import { Ticket } from '../components/Ticket';
import Search from '@mui/icons-material/Search';
import './print.scss';
import { createPortal } from 'react-dom';
import { useHomeState } from '../hooks/useHomeState';

export const HomeView: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const state = useHomeState();

  return (
    <Box className="home-view">
      {createPortal(
        <Box id="ticket-wrapper" display="flex">
          <Ticket lines={state.lines} ticketNumber={0} />
        </Box>,
        document.body,
      )}
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2">Productos</Typography>
        <input
          ref={ref}
          onChange={state.handleFileOpen}
          type="file"
          style={{ display: 'none' }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startDecorator={<FileOpen />}
            onClick={() => ref.current?.click()}
          >
            Abrir
          </Button>
          <Button startDecorator={<Print />} onClick={() => window.print()}>
            Imprimir
          </Button>
          <Button
            startDecorator={<Cancel />}
            onClick={() => state.clear()}
            color="neutral"
          >
            Limpiar
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Input
          size="sm"
          placeholder="Buscar"
          startDecorator={<Search />}
          sx={{ mb: 2 }}
          onChange={state.onSearch}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'column', lg: 'row' },
            gap: 2,
          }}
        >
          <ProductsDataGrid
            rows={state.filter ? state.filtered : state.rows}
            onProductSelected={state.onProductSelected}
          />
          <ProductsSelectionDataGrid
            lines={state.lines}
            onDeleted={state.onProductDeleted}
            onQuantityChanged={state.onQuantityChanged}
          />
          <Box display="flex">
            <Ticket lines={state.lines} ticketNumber={0} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
