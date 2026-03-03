import { Stack, Typography, Button, IconButton, CssVarsProvider, Tooltip } from '@mui/joy';
import { FC, useCallback, useMemo, useState } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Add, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useProductsStore } from '../../providers/StoreProvider';
import { useModalState } from '../../hooks/useModalState';
import { ConfirmModal } from '../../components/ConfirmModal';
import { useAppState } from '../../providers/AppStateProvider';
import { IDbProduct } from '../../../types';
import { fromProfitMultiplier, money } from '../../../utils';
import { DataGrid } from '../../libs/mui-data-grid';
import { SearchInput } from '../../components/ui/SearchInput';
import { useLoad } from '../../hooks/useLoad';

const NoRowsOverlay = () => (
  <Stack justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
    <Typography sx={{ p: 2 }}>No se encontraron productos.</Typography>
  </Stack>
);

const staticColumns: GridColDef<IDbProduct>[] = [
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
    valueFormatter: (value) => (value ? `${fromProfitMultiplier(value)}%` : ''),
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
    deleteProductById,
    reset,
  } = useProductsStore();
  useLoad(reset);
  useLoad(loadProducts);
  const navigate = useNavigate();
  const deleteModal = useModalState();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const { loader: appLoader } = useAppState();

  const columns = useMemo(() => {
    const allColumns = staticColumns.concat({
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      renderCell: ({ id }: GridRenderCellParams<IDbProduct>) => {
        return (
          <CssVarsProvider>
            <Stack justifyContent="center" alignItems="center" height="100%">
              <Tooltip variant="soft" title="Eliminar" color="danger" placement="top" enterDelay={500}>
                <IconButton
                  color="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedProductId(id as number);
                    deleteModal.open();
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Stack>
          </CssVarsProvider>
        );
      },
    });
    return allColumns;
  }, [deleteModal]);

  return (
    <Stack className="products-view" spacing={2} sx={{ height: 'calc(100vh - 100px)', width: '100%', p: 2 }}>
      <Typography level="h1">Productos</Typography>
      <Typography level="body-sm">
        Administre la lista de productos, busque, crea, elimine o actualice cualquier producto.
      </Typography>
      <Stack direction="row" gap={1}>
        <SearchInput
          sx={{ flex: 1 }}
          placeholder="Buscar producto..."
          onChange={(e) => loadProducts({ description: e.target.value, code: e.target.value, page, size })}
        />
        <Button
          startDecorator={<Add />}
          sx={{ borderRadius: 50 }}
          variant="soft"
          onClick={() => navigate('/products/add')}
        >
          Crear producto
        </Button>
      </Stack>
      <ConfirmModal
        title={<Typography level="h2">Eliminar producto</Typography>}
        content={
          <Stack>
            <Typography level="body-md">¿Estas seguro que deseas eliminar el producto?</Typography>
          </Stack>
        }
        isOpen={deleteModal.isOpen}
        onClose={() => {
          deleteModal.close();
          setSelectedProductId(null);
        }}
        onConfirm={async () => {
          if (!selectedProductId) return;
          try {
            await appLoader.waitFor(deleteProductById(selectedProductId));
            deleteModal.close();
            setSelectedProductId(null);
          } catch (e: any) {
            alert(`No se pudo eliminar el producto: ${e.message}`);
          }
        }}
      />
      <DataGrid
        showToolbar
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
