import { FC } from 'react';
import { Button, IconButton, List, ListItemButton, Stack, styled, Typography } from '@mui/joy';
import { ChevronLeft, ChevronRight, CreditCard } from '@mui/icons-material';
import { money } from '../../../utils';
import { IProduct } from '../../../types';
import { useLocalPagination } from '../../hooks/useLocalPagination';

export interface ProductListProps {
  products: IProduct[];
  onProductSelected?: (product: IProduct) => void;
}

const RoundButton = styled(Button)(({ theme }) => ({
  borderRadius: 99999,
  fontSize: theme.fontSize.xs,
  width: 40,
  height: 40,
  fontWeight: 'normal',
}));

const RoundIconButton = styled(IconButton)(() => ({
  borderRadius: 99999,
  width: 40,
  height: 40,
}));

export const ProductList: FC<ProductListProps> = ({ products, onProductSelected }) => {
  const {
    paginatedData,
    currentPage: currentPageBase0,
    nextPage,
    previousPage,
    goToPage,
  } = useLocalPagination<IProduct>(products);
  const currentPage = currentPageBase0 + 1;
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
      <Stack direction="row" justifyContent="center" width="100%" gap={3}>
        <RoundIconButton disabled={currentPage <= 1} onClick={previousPage}>
          <ChevronLeft />
        </RoundIconButton>
        {currentPage > 1 && (
          <RoundButton color="neutral" variant="plain" onClick={previousPage}>
            {currentPage - 1}
          </RoundButton>
        )}
        <RoundButton color="neutral">{currentPage}</RoundButton>
        <RoundButton color="neutral" variant="plain" onClick={nextPage}>
          {currentPage + 1}
        </RoundButton>
        {currentPage <= 1 && (
          <RoundButton color="neutral" variant="plain" onClick={() => goToPage(currentPageBase0 + 2)}>
            {currentPage + 2}
          </RoundButton>
        )}
        <RoundIconButton onClick={nextPage}>
          <ChevronRight />
        </RoundIconButton>
      </Stack>
    </Stack>
  );
};
