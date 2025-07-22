import { FC } from 'react';
import { List, ListItemButton, Stack, Typography } from '@mui/joy';
import { CreditCard } from '@mui/icons-material';
import { money } from '../../../utils';
import { IProduct } from '../../../types';
import { useLocalPagination } from '../../hooks/useLocalPagination';
import { Pagination } from '../ui/Pagination';

export interface ProductListProps {
  products: IProduct[];
  onProductSelected?: (product: IProduct) => void;
}

export const ProductList: FC<ProductListProps> = ({ products, onProductSelected }) => {
  const { paginatedData, currentPage, goToPage, totalPages } = useLocalPagination<IProduct>(products);
  if (products.length === 0) {
    return (
      <Stack justifyContent="center" alignItems="center" width="100%" height="100%">
        <Typography level="body-sm" color="neutral">
          No hay productos disponibles
        </Typography>
      </Stack>
    );
  }
  return (
    <Stack gap={2}>
      <List component="nav">
        {paginatedData.map((product) => (
          <ListItemButton
            onDoubleClick={() => onProductSelected?.(product)}
            key={product.descripcion}
            sx={{ borderRadius: 'md', p: 2 }}
          >
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Stack sx={{ maxWidth: '75%', oveflowWrap: 'break-word', gap: 0.5 }}>
                <Typography level="title-sm" fontWeight="bold">
                  {product.descripcion}
                </Typography>
                <Typography color="neutral" level="body-xs">
                  {product.codigo}
                </Typography>
              </Stack>
              <Stack gap={0.5}>
                <Typography>{money(product.precio)}</Typography>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography level="body-xs">{money(product.precioTarjeta)}</Typography>
                  <CreditCard sx={{ fontSize: 14 }} />
                </Stack>
              </Stack>
            </Stack>
          </ListItemButton>
        ))}
      </List>

      <Pagination currentPageBase0={currentPage} onPageChange={(page) => goToPage(page)} totalPages={totalPages} />
    </Stack>
  );
};
