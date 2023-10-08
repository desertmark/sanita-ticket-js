import { Box, Typography, Button, Input } from '@mui/joy';
import { FC, useRef, useState } from 'react';
import { FileOpen, Print } from '@mui/icons-material';
import MDBReader from 'mdb-reader';
import { ProductsDataGrid } from '../components/ProductsDataGrid/ProductsDataGrid';
import { ProductsSelectionDataGrid } from '../components/ProductsDataGrid/ProductSelectionDataGrid';
import { Ticket } from '../components/Ticket';
import { IProduct, ITicketLine } from '../../types';
import Search from '@mui/icons-material/Search';
import './print.scss';
import { filterProducts, readFileAsBuffer, toProduct } from '../../utils';

export const HomeView: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  // Rows state
  const [rows, setRows] = useState<IProduct[]>([]);
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>();
  const [lines, setLines] = useState<ITicketLine[]>([]);

  const handleFileOpen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const buffer = await readFileAsBuffer(file!);
    const reader = new MDBReader(buffer);
    const table = await reader.getTable('lista');
    const data = table.getData().map(toProduct);
    setRows(data);
  };

  const onProductSelected = (product: IProduct) => {
    const existent = lines.find((l) => l.product.id === product.id);
    if (existent) {
      existent.quantity++;
      setLines([...lines]);
    } else {
      setLines([...lines, { quantity: 1, product }]);
    }
  };
  const onProductDeleted = (line: ITicketLine) => {
    const newLines = lines.filter((l) => l.product.id !== line.product.id);
    setLines([...newLines]);
  };
  const onQuantityChanged = (line: ITicketLine) => {
    const newLines = lines.map((l) => {
      if (l.product.id === line.product.id) {
        l.quantity = line.quantity;
      }
      return l;
    });
    setLines([...newLines]);
  };

  return (
    <Box className="home-view">
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
          onChange={handleFileOpen}
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
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Input
          size="sm"
          placeholder="Buscar"
          startDecorator={<Search />}
          sx={{ mb: 2 }}
          onChange={(e) => {
            const filtered = rows.filter(filterProducts(e.target.value));
            setFiltered(filtered);
            setFilter(e.target.value);
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'column', lg: 'row' },
            gap: 2,
          }}
        >
          <ProductsDataGrid
            rows={filter ? filtered : rows}
            onProductSelected={onProductSelected}
          />
          <ProductsSelectionDataGrid
            lines={lines}
            onDeleted={onProductDeleted}
            onQuantityChanged={onQuantityChanged}
          />
          <Box id="ticket-wrapper" display="flex">
            <Ticket lines={lines} ticketNumber={0} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
