import { FC } from 'react';
import { Chip, List, ListItemButton, Stack, Typography } from '@mui/joy';
import { money } from '../../../utils';
import { IProduct } from '../../../types';

export interface ProductListProps {
  products: IProduct[];
  onProductSelected?: (product: IProduct) => void;
}

export const ProductList: FC<ProductListProps> = ({ products, onProductSelected }) => {
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
    <List component="nav">
      {products.map((product) => (
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
              <Chip color="primary">{money(product.precio)}</Chip>
            </Stack>
          </Stack>
        </ListItemButton>
      ))}
    </List>
  );
};
