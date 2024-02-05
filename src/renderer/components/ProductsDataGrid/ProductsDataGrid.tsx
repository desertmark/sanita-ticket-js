import { Box, Chip, Sheet, Typography, useColorScheme } from '@mui/joy';
import { FC } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useTableTheme } from '../../hooks/useTableTheme';

export interface ProductsDataGridProps {
  rows: any[];
  onProductSelected?: (product: any) => void;
}

const columns: TableColumn<any>[] = [
  {
    name: '#',
    selector: (r) => (r.id < 10 ? `0${r.id}` : r.id),
    width: '80px',
  },
  {
    name: 'Codigo',
    maxWidth: '110px',
    selector: (r) => r.codigo,
  },
  {
    name: 'Descripcion',
    selector: (r) => r.descripcion,
  },
  {
    name: 'Precio',
    selector: (r) => `$${r.precio.toFixed(2)}`,
    maxWidth: '120px',
    cell: (r) => (
      <Chip color="primary" variant="solid">{`$${r.precio.toFixed(2)}`}</Chip>
    ),
  },
];

export const ProductsDataGrid: FC<ProductsDataGridProps> = ({
  rows,
  onProductSelected,
}) => {
  const { mode } = useColorScheme();
  const styles = useTableTheme();
  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      <Sheet variant="outlined" sx={{ borderRadius: 5, overflow: 'hidden' }}>
        <DataTable
          noDataComponent={
            <Box my={2}>
              <Typography textAlign={'center'} level="title-lg">
                No hay productos cargados.
              </Typography>
              <Typography textAlign={'center'} level="title-sm">
                Utilize el boton 'Abrir' para cargar un archivo de productos.
              </Typography>
            </Box>
          }
          columns={columns}
          data={rows}
          highlightOnHover
          pagination
          theme={mode}
          paginationPerPage={20}
          customStyles={styles}
          onRowDoubleClicked={onProductSelected}
        />
      </Sheet>
    </Box>
  );
};
