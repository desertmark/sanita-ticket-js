import { useColorScheme } from '@mui/joy';
import { FC } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
export interface ProductsDataGridProps {
  rows: any[];
  columns: string[];
}

const columns: TableColumn<any>[] = [
  {
    name: '#',
    selector: (r) => (r.id < 10 ? `0${r.id}` : r.id),
    width: '50px',
  },
  {
    name: 'Codigo',
    width: '200px',
    selector: (r) => r.codigo,
  },
  {
    name: 'Descripcion',
    selector: (r) => r.descripcion,
  },
  {
    name: 'Precio',
    selector: (r) => `$${r.precio.toFixed(2)}`,
  },
];

const rowMap = (rows: any[]) =>
  rows?.map((row, id) => {
    return {
      id,
      codigo: row.codigo,
      descripcion: row.descripcion,
      precio: row.precio,
    };
  });
export const ProductsDataGrid: FC<ProductsDataGridProps> = ({ rows }) => {
  const { mode } = useColorScheme();
  return (
    <DataTable
      columns={columns}
      data={rowMap(rows)}
      highlightOnHover
      pagination
      theme={mode}
      paginationPerPage={20}
      onRowClicked={(row) => {
        console.log(row);
      }}
    />
  );
};
