/* eslint-disable react/no-unstable-nested-components */
import {
  Box,
  Button,
  Chip,
  ColorPaletteProp,
  IconButton,
  Sheet,
  Stack,
  Tooltip,
  Typography,
  useColorScheme,
  useTheme,
} from '@mui/joy';
import { FC, useState } from 'react';
import DataTable, { Alignment, TableColumn } from 'react-data-table-component';
import { CheckCircleOutlined, Delete, DoNotDisturb, Print, Visibility } from '@mui/icons-material';
import { omit } from 'lodash';
import { IHistoryItem, ITicketLine, PayMethod } from '../../types';
import { useTableTheme } from '../hooks/useTableTheme';
import { ITicketFilters, TicketState } from '../hooks/useSupabase';
import { downloadHistoryCSV, downloadHistoryWithDetailCSV, money } from '../../utils';
import { HistoryFilters } from './HistoryFilters';
import { IReturnProduct } from '../hooks/useReturnTicket';

export interface HistoryDataGridProps {
  rows: any[];
  total: number;
  onHistoryItemSelected?: (historyItem: any) => void;
  onPrint?: (historyItem: any) => void;
  onDelete?: (historyItem: any) => void;
  onAnull?: (historyItem: any) => void;
  onConfirm?: (historyItem: any) => void;
  onView?: (historyItem: any) => void;
  onChangePage?: (page: number) => void;
  onChangeSize?: (page: number, size: number) => void;
  onChangeFilters?: (filters: ITicketFilters) => void;
  showDelete?: boolean;
}

const PayMethodColors: Record<PayMethod, ColorPaletteProp> = {
  Efectivo: 'success',
  Debito: 'primary',
  Credito: 'warning',
};

export const HistoryDataGrid: FC<HistoryDataGridProps> = ({
  rows,
  total,
  onHistoryItemSelected,
  onPrint,
  onDelete,
  onView,
  onAnull,
  onConfirm,
  onChangePage,
  onChangeSize,
  onChangeFilters,
  showDelete,
}) => {
  const { mode } = useColorScheme();
  const styles = useTableTheme();
  const [paginationPerPage, setPaginationPerPage] = useState(10);
  const columns: TableColumn<any>[] = [
    {
      name: <Typography level="body-sm">Ticket N°</Typography>,
      selector: (r: IHistoryItem) => (r.id < 10 ? `0${r.id}` : r.id),
      minWidth: '120px',
    },
    {
      name: <Typography level="body-sm">Fecha</Typography>,
      minWidth: '110px',
      selector: (r: IHistoryItem) => new Date(r.date).toLocaleDateString('es-AR'),
    },
    {
      name: <Typography level="body-sm">Hora</Typography>,
      minWidth: '110px',
      selector: (r: IHistoryItem) => new Date(r.date).toLocaleTimeString('es-AR'),
    },
    {
      name: <Typography level="body-sm">Metodo de Pago</Typography>,
      selector: (r: IHistoryItem) => r.payMethod,
      cell: (r: IHistoryItem) => (
        <Chip size="sm" color={PayMethodColors[r.payMethod]} variant="solid">
          {r.payMethod}
        </Chip>
      ),
    },
    {
      name: <Typography level="body-sm">Subtotal</Typography>,
      selector: (r: IHistoryItem) => `${money(r.subTotal, 2)}`,
      minWidth: '120px',
      cell: (r) => <Chip size="sm" color="neutral" variant="solid">{`${money(r.subTotal, 2)}`}</Chip>,
    },
    {
      name: <Typography level="body-sm">Descuento</Typography>,
      selector: (r: IHistoryItem) => `${money(r.subTotal, 2)}`,
      minWidth: '140px',
      cell: (r: IHistoryItem) => <Chip size="sm" color="neutral" variant="solid">{`${r.discount.toFixed(2)}%`}</Chip>,
    },
    {
      name: <Typography level="body-sm">Ticket Devolución</Typography>,
      selector: (r: IHistoryItem) => r.returnTicket?.ticket?.id || '-',
    },
    {
      name: <Typography level="body-sm">Descuento por Devolucón</Typography>,
      selector: (r: IHistoryItem) => `${money(r.returnTicket?.totalCredit || 0, 2)}`,
      minWidth: '140px',
      cell: (r: IHistoryItem) => (
        <Chip size="sm" color="neutral" variant="solid">{`${money(r.returnTicket?.totalCredit || 0, 2)}`}</Chip>
      ),
    },
    {
      name: <Typography level="body-sm">Total</Typography>,
      selector: (r: IHistoryItem) => `${money(r.total, 2)}`,
      minWidth: '120px',
      cell: (r) => <Chip size="sm" color="primary" variant="solid">{`${money(r.total, 2)}`}</Chip>,
    },
    {
      name: <Typography level="body-sm">Acciones</Typography>,
      cell: (historyItem) => (
        <Actions
          historyItem={historyItem}
          onPrint={onPrint}
          onView={onView}
          onDelete={onDelete}
          onAnull={onAnull}
          onConfirm={onConfirm}
          showDelete={showDelete}
        />
      ),
    },
  ];
  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      <Sheet variant="outlined" sx={{ borderRadius: 5, overflow: 'hidden' }}>
        <DataTable
          actions={
            <>
              <Button onClick={() => downloadHistoryCSV(rows)}>Exportar CSV</Button>
              <Button onClick={() => downloadHistoryWithDetailCSV(rows)}>Exportar CSV (con detalle)</Button>
            </>
          }
          subHeader
          subHeaderComponent={
            <HistoryFilters
              onChange={(filters) =>
                onChangeFilters?.({
                  ...filters,
                  page: 1,
                  size: paginationPerPage,
                })
              }
            />
          }
          subHeaderAlign={Alignment.LEFT}
          noDataComponent={
            <Box my={2}>
              <Typography textAlign="center" level="title-lg">
                No se ha generado ningun ticket aun.
              </Typography>
              <Typography textAlign="center" level="title-sm">
                Utiliza la vista de 'Inicio' para cargar un archivo de productos y generar tickets de venta.
              </Typography>
            </Box>
          }
          columns={columns}
          data={rows}
          highlightOnHover
          pagination
          theme={mode}
          customStyles={styles}
          onRowDoubleClicked={onHistoryItemSelected}
          expandOnRowClicked
          expandableRows
          expandableRowsComponent={HistoryItemRowDetail}
          onChangePage={(page) => onChangePage?.(page - 1)}
          onChangeRowsPerPage={(size, page) => {
            setPaginationPerPage(size);
            onChangeSize?.(page, size);
          }}
          paginationTotalRows={total}
          paginationPerPage={paginationPerPage}
          paginationRowsPerPageOptions={[10, 25, 50, 100, 200]}
          paginationServer
          conditionalRowStyles={[
            {
              when: (row) => row.state === TicketState.anulled,
              style: {
                textDecoration: 'line-through',
                color: useTheme().palette.danger.plainColor,
              },
            },
          ]}
        />
      </Sheet>
    </Box>
  );
};

const HistoryItemRowDetail = ({ data }: { data: IHistoryItem }) => {
  const { mode } = useColorScheme();
  const theme = useTheme();
  const styles = useTableTheme({
    rows: {
      style: {
        background: theme.palette.background.level1,
      },
    },
    header: {
      style: {
        height: '100px',
      },
    },
    headCells: {
      style: {
        fontSize: theme.fontSize.sm,
        background: theme.palette.background.level1,
        color: theme.palette.text.tertiary,
        fontWeight: theme.fontWeight.sm,
      },
    },
  });
  return (
    <Box>
      <DataTable
        subHeader
        subHeaderAlign={Alignment.LEFT}
        subHeaderComponent={<Typography fontWeight="bold">Productos comprados:</Typography>}
        data={data.ticketLines}
        theme={mode}
        customStyles={omit(styles, 'cells')}
        paginationServer
        columns={[
          {
            name: 'Codigo',
            selector: (r: ITicketLine) => r.product.codigo,
          },
          {
            name: 'Concepto',
            selector: (r: ITicketLine) => r.product.descripcion,
          },
          {
            name: 'Precio',
            selector: (r: ITicketLine) => `${money(r.product.precio, 2)}`,
          },
          {
            name: 'Precio tarjeta',
            selector: (r: ITicketLine) => `${money(r.product.precioTarjeta, 2)}`,
          },
          {
            name: 'Cantidad',
            selector: (r: ITicketLine) => r.quantity,
          },
        ]}
      />
      {data.returnTicket?.ticket?.id && (
        <DataTable
          subHeader
          subHeaderAlign={Alignment.LEFT}
          subHeaderComponent={<Typography fontWeight="bold">Productos devueltos:</Typography>}
          data={data.returnTicket?.returnProducts || []}
          theme={mode}
          customStyles={omit(styles, 'cells')}
          paginationServer
          columns={[
            {
              name: 'Codigo',
              selector: (r: IReturnProduct) => r.line.product.codigo,
            },
            {
              name: 'Concepto',
              selector: (r: IReturnProduct) => r.line.product.descripcion,
            },
            {
              name: 'Precio',
              selector: (r: IReturnProduct) => `${money(r.line.product.precio, 2)}`,
            },
            {
              name: 'Precio tarjeta',
              selector: (r: IReturnProduct) => `${money(r.line.product.precioTarjeta, 2)}`,
            },
            {
              name: 'Cantidad',
              selector: (r: IReturnProduct) => r.line.quantity,
            },
            {
              name: 'Total devuelto',
              selector: (r: IReturnProduct) => money(r.returnAmount, 2),
            },
          ]}
        />
      )}
    </Box>
  );
};

const Actions: FC<any> = ({ historyItem, onDelete, onView, onPrint, onAnull, onConfirm, showDelete }) => {
  return (
    <Box display="flex" gap={2}>
      <Tooltip title="Ver ticket" color="primary" placement="top" enterDelay={500}>
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
      <Tooltip title="Imprimir ticket" color="neutral" placement="top" enterDelay={500}>
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
      {showDelete &&
        (historyItem.state !== TicketState.anulled ? (
          <Tooltip title="Anular" color="warning" placement="top" enterDelay={500}>
            <IconButton variant="soft" size="sm" color="warning" title="Anular" onClick={() => onAnull?.(historyItem)}>
              <DoNotDisturb />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Confirmar" color="success" placement="top" enterDelay={500}>
            <IconButton
              variant="soft"
              size="sm"
              color="success"
              title="Confirmar"
              onClick={() => onConfirm?.(historyItem)}
            >
              <CheckCircleOutlined />
            </IconButton>
          </Tooltip>
        ))}
      {showDelete && (
        <Tooltip title="Eliminar" color="danger" placement="top" enterDelay={500}>
          <IconButton variant="soft" size="sm" color="danger" title="Eliminar" onClick={() => onDelete?.(historyItem)}>
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
