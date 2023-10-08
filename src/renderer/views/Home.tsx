import { Box, Typography, Button } from '@mui/joy';
import { FC, useRef, useState } from 'react';
import { FileOpen, Print } from '@mui/icons-material';
import MDBReader from 'mdb-reader';
import { ProductsDataGrid } from '../components/ProductsDataGrid';
import { Ticket } from '../components/Ticket';
import { IProduct, ITicketLine } from '../../types';
import './print.scss';

function readFileAsBuffer(file: File): Promise<Buffer> {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const buffer: any[] = event.target?.result as unknown as any;
      resolve(Buffer.from(buffer));
    };

    reader.onerror = (event) => {
      reject(event.target?.error);
    };

    reader.readAsArrayBuffer(file);
  });
}

const toProduct = (row: any, id: number): IProduct => {
  return {
    id,
    codigo: row.codigo,
    descripcion: row.descripcion,
    precio: row.precio,
  };
};
export const HomeView: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  // Rows state
  const [rows, setRows] = useState<IProduct[]>([]);
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>();
  const [lines, setLines] = useState<ITicketLine[]>([]);
  // columns state

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'column', lg: 'row' },
            gap: 2,
          }}
        >
          <ProductsDataGrid
            title="Productos"
            emptyMessage="No hay productos cargados. Haga click en el boton 'Abrir' para cargar un archivo MDB."
            rows={filter ? filtered : rows}
            onProductSelected={onProductSelected}
            onSearch={(value) => {
              const filtered = rows.filter((r) => {
                return (
                  r?.codigo?.replace(/\./gm, '').includes(value) ||
                  r?.codigo?.includes(value) ||
                  r?.descripcion?.toLowerCase()?.includes(value.toLowerCase())
                );
              });

              setFiltered(filtered);
              setFilter(value);
            }}
          />
          <ProductsDataGrid
            title="Seleccionados"
            rows={lines.map((l) => l.product)}
            emptyMessage="No hay productos seleccionados. Seleccione un producto de la tabla."
          />
          <Box id="ticket-wrapper" display="flex" >
            <Ticket lines={lines} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
