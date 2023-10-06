import {
  Box,
  Typography,
  Button,
  Table,
  useColorScheme,
  Sheet,
} from '@mui/joy';
import { FC, useEffect, useRef, useState } from 'react';
import { FileOpen } from '@mui/icons-material';
import MDBReader from 'mdb-reader';
import DataTable, { TableColumn } from 'react-data-table-component';
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
  const { mode } = useColorScheme();
  const ref = useRef<HTMLInputElement>(null);
  // Rows state
  const [rows, setRows] = useState<any[]>([]);
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
        <ProductsDataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};
