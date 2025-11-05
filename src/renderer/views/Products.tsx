import { Stack } from '@mui/joy';
import { FC, useEffect } from 'react';
import { useProductsStore } from '../providers/StoreProvider';

const useLoad = (cb: () => Promise<any>) => {
  let result: any;
  useEffect(() => {
    cb();
  }, [cb]);
  return result;
};

export const ProductsView: FC = () => {
  const { products, loadProducts } = useProductsStore();
  useLoad(loadProducts);
  return (
    <Stack className="history-view">
      <h1>Productos</h1>
      <Stack sx={{ '& .ag-root-wrapper': { overflow: 'auto' } }}>{JSON.stringify(products)}</Stack>
    </Stack>
  );
};
