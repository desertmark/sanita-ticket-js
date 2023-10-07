import { Box, Typography, Button } from '@mui/joy';
import { FC, useRef, useState } from 'react';
import { FileOpen } from '@mui/icons-material';
import MDBReader from 'mdb-reader';
import { ProductsDataGrid } from '../components/ProductsDataGrid';

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
export const HomeView: FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  // Rows state
  const [rows, setRows] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>();
  const [selected, setSelected] = useState<any[]>([]);
  // columns state
  const [columns, setColumns] = useState<string[]>([]);

  const handleFileOpen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const buffer = await readFileAsBuffer(file!);
    const reader = new MDBReader(buffer);
    const table = await reader.getTable('lista');
    const data = table.getData();
    setRows(data);
    setColumns(table.getColumnNames());
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
        <Button
          startDecorator={<FileOpen />}
          onClick={() => ref.current?.click()}
        >
          Abrir
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { sm: 'column', md: 'column', lg: 'row' },
            gap: 2,
          }}
        >
          <ProductsDataGrid
            title="Productos"
            emptyMessage="No hay productos cargados. Haga click en el boton 'Abrir' para cargar un archivo MDB."
            rows={filter ? filtered : rows}
            onProductSelected={(row) => {
              if (selected?.find((r) => r.id === row.d)) {
              }
              setSelected([...selected, row]);
            }}
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
            rows={selected}
            emptyMessage="No hay productos seleccionados. Seleccione un producto de la tabla."
          />
        </Box>
      </Box>
    </Box>
  );
};
