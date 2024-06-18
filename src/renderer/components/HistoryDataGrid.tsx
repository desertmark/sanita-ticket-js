/* eslint-disable react/no-unstable-nested-components */
import {
  Box,
  Chip,
  ColorPaletteProp,
  IconButton,
  Sheet,
  Tooltip,
  Typography,
  useColorScheme,
} from '@mui/joy';
import { FC } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Delete, Print, Visibility } from '@mui/icons-material';
import { IHistoryItem, ITicketLine, PayMethod } from '../../types';
import { useTableTheme } from '../hooks/useTableTheme';

export interface HistoryDataGridProps {
  rows: any[];
  onHistoryItemSelected?: (historyItem: any) => void;
  onPrint?: (historyItem: any) => void;
  onDeleted?: (historyItem: any) => void;
  onView?: (historyItem: any) => void;
}

const PayMethodColors: Record<PayMethod, ColorPaletteProp> = {
  Efectivo: 'success',
  Debito: 'primary',
  Credito: 'warning',
};

export const HistoryDataGrid: FC<HistoryDataGridProps> = ({
  rows,
  onHistoryItemSelected,
  onPrint,
  onDeleted,
  onView,
}) => {
  const { mode } = useColorScheme();
  const styles = useTableTheme();

  const columns: TableColumn<any>[] = [
    {
      name: 'Ticket N°',
      selector: (r: IHistoryItem) => (r.id < 10 ? `0${r.id}` : r.id),
      minWidth: '120px',
    },
    {
      name: 'Fecha',
      minWidth: '110px',
      selector: (r: IHistoryItem) =>
        new Date(r.date).toLocaleDateString('es-AR'),
    },
    {
      name: 'Hora',
      minWidth: '110px',
      selector: (r: IHistoryItem) =>
        new Date(r.date).toLocaleTimeString('es-AR'),
    },
    {
      name: 'Metodo de Pago',
      selector: (r: IHistoryItem) => r.payMethod,
      cell: (r: IHistoryItem) => (
        <Chip color={PayMethodColors[r.payMethod]} variant="solid">
          {r.payMethod}
        </Chip>
      ),
    },
    {
      name: 'Subtotal',
      selector: (r: IHistoryItem) => `$${r.subTotal.toFixed(2)}`,
      minWidth: '120px',
      cell: (r) => (
        <Chip color="neutral" variant="solid">{`$${r.subTotal.toFixed(
          2,
        )}`}</Chip>
      ),
    },
    {
      name: 'Descuento',
      selector: (r: IHistoryItem) => `$${r.subTotal.toFixed(2)}`,
      minWidth: '140px',
      cell: (r) => (
        <Chip color="neutral" variant="solid">{`$${r.subTotal.toFixed(
          2,
        )}`}</Chip>
      ),
    },
    {
      name: 'Total',
      selector: (r: IHistoryItem) => `$${r.total.toFixed(2)}`,
      minWidth: '120px',
      cell: (r) => (
        <Chip color="primary" variant="solid">{`$${r.total.toFixed(2)}`}</Chip>
      ),
    },
    {
      name: 'Acciones',
      maxWidth: '150px',
      cell: (historyItem) => (
        <Actions
          historyItem={historyItem}
          onPrint={onPrint}
          onView={onView}
          onDeleted={onDeleted}
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
                No se ha generado ningun ticket aun.
              </Typography>
              <Typography textAlign="center" level="title-sm">
                Utiliza la vista de 'Inicio' para cargar un archivo de productos
                y generar tickets de venta.
              </Typography>
            </Box>
          }
          columns={columns}
          data={rows}
          highlightOnHover
          pagination
          theme={mode}
          paginationPerPage={20}
          customStyles={styles}
          onRowDoubleClicked={onHistoryItemSelected}
          expandOnRowClicked
          expandableRows
          expandableRowsComponent={HistoryExpandedRow}
        />
      </Sheet>
    </Box>
  );
};

const HistoryExpandedRow: FC<{ data: IHistoryItem }> = ({
  data: historyItem,
}) => {
  return (
    <Box>
      {historyItem.ticketLines.map((line: ITicketLine) => {
        return (
          <Box
            key={line.product.id}
            display="flex"
            justifyContent="space-between"
          >
            <Typography>{line.product.descripcion}</Typography>
            <Typography>{`$${line.product.precio.toFixed(2)}`}</Typography>
            <Typography>{line.quantity}</Typography>
            <Typography>{`$${(line.product.precio * line.quantity).toFixed(
              2,
            )}`}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

const Actions: FC<any> = ({ historyItem, onDeleted, onView, onPrint }) => {
  return (
    <Box display="flex" gap={2}>
      <Tooltip
        title="Ver ticket"
        color="primary"
        placement="top"
        enterDelay={500}
      >
        <IconButton
          variant="soft"
          size="sm"
          color="primary"
          onClick={() => {
            onView?.(historyItem);
          }}
        >
          <Visibility />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Imprimir ticket"
        color="neutral"
        placement="top"
        enterDelay={500}
      >
        <IconButton
          variant="soft"
          size="sm"
          color="neutral"
          onClick={() => {
            onPrint?.(historyItem);
          }}
        >
          <Print />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar" color="danger" placement="top" enterDelay={500}>
        <IconButton
          variant="soft"
          size="sm"
          color="danger"
          title="Eliminar"
          onClick={() => onDeleted?.(historyItem)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
