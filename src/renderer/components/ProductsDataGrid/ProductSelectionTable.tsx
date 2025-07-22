import { Box, IconButton, List, ListItem, Stack, Table, Tooltip, Typography } from '@mui/joy';
import { FC, useRef, useState } from 'react';
import { Delete } from '@mui/icons-material';
import { ITicketLine, PayMethod } from '../../../types';
import { EditableChip } from '../EditableChip';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { money } from '../../../utils';
import { Caption } from '../ui/Caption';

interface ProductsSelectionDataGridEvents {
  onDeleted?: (line: ITicketLine) => void;
}
interface ActionProps extends ProductsSelectionDataGridEvents {
  line: ITicketLine;
}

export interface ProductsSelectionTableProps extends ProductsSelectionDataGridEvents {
  lines: ITicketLine[];
  onDeleted?: (line: ITicketLine) => void;
  onQuantityChanged?: (line: ITicketLine) => void;
  payMethod: PayMethod;
}

export const ProductsSelectionTable: FC<ProductsSelectionTableProps> = ({
  lines,
  onDeleted,
  onQuantityChanged,
  payMethod,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useResizeObserver(ref, (entries) => {
    const { width } = entries[0].contentRect;
    setIsMobile(width <= 600);
  });

  if (lines?.length === 0) {
    return (
      <Box ref={ref} sx={{ padding: 2 }}>
        <Typography color="neutral" level="body-md" sx={{ textAlign: 'center' }}>
          No hay productos seleccionados.
        </Typography>
      </Box>
    );
  }
  const isCreditPayMethod = [PayMethod.CREDIT, PayMethod.DEBIT].includes(payMethod);
  const mobileTemplate = (
    <List sx={{ gap: 2 }}>
      {lines?.map((line) => (
        <ListItem key={line.product.codigo}>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Stack gap={1}>
              <Typography fontWeight="bold" level="body-sm" sx={(theme) => ({ color: theme.palette.text.primary })}>
                {line.product.descripcion}
              </Typography>
              <Caption>
                {line.product.codigo} - {money(isCreditPayMethod ? line.product.precioTarjeta : line.product.precio)}
              </Caption>
            </Stack>
            <Stack>
              <Stack direction="row" alignItems="center" height="100%" gap={1}>
                <QuantityCell line={line} onChange={onQuantityChanged} />
                <Actions onDeleted={onDeleted} line={line} />
              </Stack>
            </Stack>
          </Stack>
        </ListItem>
      ))}
    </List>
  );

  const desktopTemplate = (
    <Table
      sx={{
        '& tr > *:not(:first-of-type, :last-child)': { textAlign: 'center' },
        '& tr > *': { padding: 2 },
        '& tr > .sx-hidden': {
          display: {
            lg: 'none',
            xl: 'table-cell',
          },
        },
      }}
    >
      <thead>
        <tr>
          <th style={{ width: '40%' }}>PRODUCTO</th>
          <th className="sx-hidden">CODIGO</th>
          <th>CANTIDAD</th>
          <th>PRECIO</th>
          <th style={{ textAlign: 'right' }}>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((l) => (
          <tr key={l.product.codigo}>
            <td style={{ textAlign: 'left' }}>{l.product.descripcion}</td>
            <td className="sx-hidden">{l.product.codigo}</td>
            <td>
              <Stack alignItems="center">
                <QuantityCell line={l} onChange={onQuantityChanged} />
              </Stack>
            </td>
            <td>{money(isCreditPayMethod ? l.product.precioTarjeta : l.product.precio)}</td>
            <td>
              <Stack alignItems="flex-end">
                <Actions line={l} onDeleted={onDeleted} />
              </Stack>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
  return <Box ref={ref}>{isMobile ? mobileTemplate : desktopTemplate}</Box>;
};

const QuantityCell: FC<{
  line: ITicketLine;
  onChange?: (line: ITicketLine) => void;
}> = ({ line, onChange }) => {
  return (
    <EditableChip
      value={line.quantity}
      onChange={(quantity: number) => {
        onChange?.({ ...line, quantity });
      }}
    />
  );
};

const Actions: FC<ActionProps> = ({ line, onDeleted }) => {
  return (
    <Box display="flex" gap={1}>
      <Tooltip variant="soft" title="Eliminar" color="danger" placement="top" enterDelay={500}>
        <IconButton variant="plain" size="sm" color="danger" title="Eliminar" onClick={() => onDeleted?.(line)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
