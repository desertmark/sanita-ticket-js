/* eslint-disable react/no-unstable-nested-components */
import { Box, IconButton, Sheet, Tooltip, Typography, useColorScheme } from '@mui/joy';
import { FC, useRef, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Delete } from '@mui/icons-material';
import { ITicketLine } from '../../../types';
import { EditableChip } from '../EditableChip';
import { useTableTheme } from '../../hooks/useTableTheme';
import { useResizeObserver } from '../../hooks/useResizeObserver';

interface ProductsSelectionDataGridEvents {
  onDeleted?: (line: ITicketLine) => void;
}
interface ActionProps extends ProductsSelectionDataGridEvents {
  line: ITicketLine;
}

export interface ProductsSelectionDataGridProps extends ProductsSelectionDataGridEvents {
  lines: ITicketLine[];
  onDeleted?: (line: ITicketLine) => void;
  onQuantityChanged?: (line: ITicketLine) => void;
}

export const ProductsSelectionDataGrid: FC<ProductsSelectionDataGridProps> = ({
  lines,
  onDeleted,
  onQuantityChanged,
}) => {
  const { mode } = useColorScheme();
  const styles = useTableTheme({ cells: { style: { paddingLeft: '8px', paddingRight: '4px' } } });
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useResizeObserver(ref, (entries) => {
    const { width } = entries[0].contentRect;
    setIsMobile(width <= 700);
  });
  const columnsDesktop: TableColumn<ITicketLine>[] = [
    {
      name: '#',
      selector: (r) => (r.product.id < 10 ? `0${r.product.id}` : r.product.id),
      width: '50px',
    },
    {
      name: 'Codigo',
      maxWidth: '100px',
      selector: (r) => r.product.codigo,
    },
    {
      name: 'Descripcion',
      wrap: true,
      selector: (r) => r.product.descripcion,
    },
    {
      name: 'Cantidad',
      maxWidth: '150px',
      cell: (r) => <QuantityCell line={r} onChange={onQuantityChanged} />,
    },
    {
      name: 'Acciones',
      maxWidth: '110px',
      cell: (line) => <Actions onDeleted={onDeleted} line={line} />,
    },
  ];

  const columnsMobile: TableColumn<ITicketLine>[] = [
    {
      name: 'Detalle',
      cell: (line) => (
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" flexDirection="column">
            <Typography level="body-xs">Codigo:</Typography>
            <Typography level="body-sm" sx={(theme) => ({ color: theme.palette.text.primary })}>
              {line.product.codigo}
            </Typography>
            <Typography level="body-xs">Descripcion:</Typography>
            <Typography level="body-sm" sx={(theme) => ({ color: theme.palette.text.primary })}>
              {line.product.descripcion}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" height="100%" gap={1}>
              <QuantityCell line={line} onChange={onQuantityChanged} />
              <Actions onDeleted={onDeleted} line={line} />
            </Box>
          </Box>
        </Box>
      ),
    },
  ];

  const columns = isMobile ? columnsMobile : columnsDesktop;
  return (
    <Sheet ref={ref} variant="outlined" sx={{ borderRadius: 5, overflow: 'hidden' }}>
      <DataTable
        noDataComponent={
          <Box my={2}>
            <Typography textAlign="center" level="title-lg">
              No hay productos seleccionados.
            </Typography>
            <Typography textAlign="center" level="title-sm">
              Doble click en la tabla de productos para añadirlos.
            </Typography>
          </Box>
        }
        columns={columns}
        data={lines}
        highlightOnHover
        pagination
        theme={mode}
        paginationPerPage={20}
        customStyles={styles}
      />
    </Sheet>
  );
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
        <IconButton variant="soft" size="sm" color="danger" title="Eliminar" onClick={() => onDeleted?.(line)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
