/* eslint-disable react/no-unstable-nested-components */
import {
  Box,
  IconButton,
  Sheet,
  Tooltip,
  Typography,
  useColorScheme,
} from '@mui/joy';
import { FC } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Delete, PlusOne } from '@mui/icons-material';
import { ITicketLine } from '../../../types';
import { EditableChip } from '../EditableChip';
import { useTableTheme } from '../../hooks/useTableTheme';

interface ProductsSelectionDataGridEvents {
  onDeleted?: (line: ITicketLine) => void;
  onQuantityChanged?: (line: ITicketLine) => void;
}
interface ActionProps extends ProductsSelectionDataGridEvents {
  line: ITicketLine;
}

export interface ProductsSelectionDataGridProps
  extends ProductsSelectionDataGridEvents {
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
  const styles = useTableTheme();
  const columns: TableColumn<ITicketLine>[] = [
    {
      name: '#',
      selector: (r) => (r.product.id < 10 ? `0${r.product.id}` : r.product.id),
      width: '80px',
    },
    {
      name: 'Codigo',
      maxWidth: '110px',
      selector: (r) => r.product.codigo,
    },
    {
      name: 'Descripcion',
      wrap: true,
      selector: (r) => r.product.descripcion,
    },
    {
      name: 'Cantidad',
      maxWidth: '200px',
      cell: (r) => <QuantityCell line={r} onChange={onQuantityChanged} />,
    },
    {
      name: 'Acciones',
      maxWidth: '110px',
      cell: (line) => (
        <Actions
          onDeleted={onDeleted}
          onQuantityChanged={onQuantityChanged}
          line={line}
        />
      ),
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      <Sheet variant="outlined" sx={{ borderRadius: 5, overflow: 'hidden' }}>
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
    </Box>
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

const Actions: FC<ActionProps> = ({ line, onDeleted, onQuantityChanged }) => {
  return (
    <Box display="flex" gap={2}>
      <Tooltip title="Eliminar" color="danger" placement="top" enterDelay={500}>
        <IconButton
          variant="soft"
          size="sm"
          color="danger"
          title="Eliminar"
          onClick={() => onDeleted?.(line)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Sumar unidad"
        color="success"
        placement="top"
        enterDelay={500}
      >
        <IconButton
          variant="soft"
          size="sm"
          color="success"
          onClick={() => {
            onQuantityChanged?.({
              ...line,
              quantity: line.quantity + 1,
            });
          }}
        >
          <PlusOne />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
