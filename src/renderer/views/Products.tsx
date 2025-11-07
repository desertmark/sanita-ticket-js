import { Stack, Typography, Button } from '@mui/joy';
import { FC, useEffect } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Add } from '@mui/icons-material';
import { useProductsStore } from '../providers/StoreProvider';
import { IDbProduct } from '../../types';
import { money } from '../../utils';
import { DataGrid } from '../libs/mui-data-grid';
import { SearchInput } from '../components/ui/SearchInput';

const NoRowsOverlay = () => (
  <Stack justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
    <Typography sx={{ p: 2 }}>No se encontraron productos.</Typography>
  </Stack>
);
const useLoad = (cb: () => Promise<any>) => {
  useEffect(() => {
    cb();
  }, [cb]);
};

const columns: GridColDef<IDbProduct>[] = [
  {
    field: 'code',
    headerName: 'Código',
    width: 130,
  },
  {
    field: 'description',
    headerName: 'Descripción',
    width: 300,
    flex: 1,
  },
  {
    field: 'price',
    headerName: 'Precio',
    width: 100,
    type: 'number',
    valueFormatter: (value) => (value ? money(value) : ''),
  },
  {
    field: 'discount_percentage',
    headerName: 'Bonif. (%)',
    width: 110,
    type: 'number',
  },
  {
    field: 'discount_percentage_2',
    headerName: 'Bonif. 2 (%)',
    width: 120,
    type: 'number',
  },
  {
    field: 'cash_discount_1',
    headerName: 'Desc. Caja 1 (%)',
    width: 140,
    type: 'number',
  },
  {
    field: 'cash_discount_2',
    headerName: 'Desc. Caja 2 (%)',
    width: 140,
    type: 'number',
  },
  {
    field: 'cost',
    headerName: 'Costo',
    width: 100,
    type: 'number',
    valueFormatter: (value) => (value ? money(value) : ''),
  },
  {
    field: 'profit',
    headerName: 'Ganancia',
    width: 100,
    type: 'number',
    valueFormatter: (value) => (value ? `${((value - 1) * 100).toFixed(1)}%` : ''),
  },
  {
    field: 'list_price',
    headerName: 'Precio Lista',
    width: 120,
    type: 'number',
    valueFormatter: (value) => (value ? money(value) : ''),
  },
  {
    field: 'tax',
    headerName: 'IVA (%)',
    width: 90,
    type: 'number',
  },
  {
    field: 'dollar',
    headerName: 'Precio Dólar',
    width: 120,
    type: 'number',
    valueFormatter: (value) => (value ? money(value) : ''),
  },
  {
    field: 'freight',
    headerName: 'Flete (%)',
    width: 100,
    type: 'number',
  },
  {
    field: 'category',
    headerName: 'Rubro',
    width: 200,
  },
  {
    field: 'card',
    headerName: 'Tarjeta (%)',
    width: 110,
    type: 'number',
  },
  {
    field: 'created_at',
    headerName: 'Creado',
    width: 180,
    type: 'dateTime',
    valueGetter: (value) => value && new Date(value),
  },
  {
    field: 'updated_at',
    headerName: 'Actualizado',
    width: 180,
    type: 'dateTime',
    valueGetter: (value) => value && new Date(value),
  },
];
export const ProductsView: FC = () => {
  const {
    products,
    loadProducts,
    totalProducts,
    filters: { page, size },
  } = useProductsStore();
  useLoad(loadProducts);
  return (
    <Stack className="products-view" spacing={2} sx={{ height: 'calc(100vh - 100px)', width: '100%', p: 2 }}>
      <Typography level="h1">Productos</Typography>
      <Stack direction="row" gap={1}>
        <SearchInput
          sx={{ flex: 1 }}
          placeholder="Buscar producto..."
          onChange={(e) => loadProducts({ description: e.target.value, code: e.target.value, page, size })}
        />
        <Button startDecorator={<Add />} sx={{ borderRadius: 50 }} variant="soft">
          Crear producto
        </Button>
      </Stack>
      <DataGrid
        slots={{
          noRowsOverlay: NoRowsOverlay,
        }}
        rows={products}
        rowCount={totalProducts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page, pageSize: size },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        autosizeOptions={{
          columns: columns.map((col) => col.field),
          includeHeaders: true,
          includeOutliers: true,
        }}
        autosizeOnMount
        onPaginationModelChange={(model) => loadProducts({ page: model.page + 1, size: model.pageSize })}
      />
    </Stack>
  );
};
