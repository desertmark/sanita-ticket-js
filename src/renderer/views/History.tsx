import { Box, Stack, Typography } from '@mui/joy';
import { FC } from 'react';
import { Warning } from '@mui/icons-material';
import { HistoryDataGrid } from '../components/HistoryDataGrid';
import { useHistoryState } from '../providers/HistoryStateProvider';
import { useAppState } from '../providers/AppStateProvider';
import { IHistoryItem } from '../../types';
import { ViewTicketModal } from '../components/ViewTicketModal';
import { useTicketsApi } from '../hooks/useSupabase';
import { ConfirmModal } from '../components/ConfirmModal';
import { useAsync } from '../hooks/useAsync';
import { TicketState } from '../../types/tickets';

export const HistoryView: FC = () => {
  // Providers
  const { setCurrentTicket, currentTicket, loader: appLoader, currentUser } = useAppState();
  const { viewTicketModal, deleteModal, printTicket, setFilters, filters } = useHistoryState();
  // Apis
  const { deleteTicket, findTickets, updateState, countTickets } = useTicketsApi();
  // Asyncs
  const { data: tickets, refresh: loadTickets } = useAsync(findTickets, filters, [] as IHistoryItem[]);
  const { data: totalTickets, refresh: loadTotalTickets } = useAsync(countTickets, filters, 0);

  const handleView = (ticket: IHistoryItem) => {
    setCurrentTicket(ticket);
    viewTicketModal?.open();
  };

  const handleDeleteConfirm = async () => {
    try {
      await appLoader.waitFor(deleteTicket(currentTicket!.id));
      deleteModal?.close();
    } catch (e: Error | any) {
      alert(`No se pudo eliminar el ticket: ${e.message}`);
    }
  };

  const handleDelete = async (ticket: IHistoryItem) => {
    setCurrentTicket(ticket);
    deleteModal?.open();
  };

  return (
    <Box className="history-view">
      <ViewTicketModal
        ticket={currentTicket!}
        onClose={viewTicketModal?.close}
        isOpen={viewTicketModal?.isOpen}
        onPrint={() => printTicket?.(currentTicket!)}
      />
      <ConfirmModal
        title={<Typography level="h2">Eliminar ticket</Typography>}
        content={
          <Stack>
            <Typography level="body-md">¿Estas seguro que deseas eliminar el ticket?</Typography>
            <Box display="flex" gap={1} alignItems="flex-end">
              <Warning color="warning" />
              <Typography color="warning" level="body-sm">
                Esta accion no se puede revertir.
              </Typography>
            </Box>
          </Stack>
        }
        isOpen={deleteModal?.isOpen}
        onClose={deleteModal?.close}
        onConfirm={handleDeleteConfirm}
      />
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2">Historico</Typography>
      </Box>
      <HistoryDataGrid
        rows={tickets || []}
        onPrint={printTicket}
        onView={handleView}
        onDelete={handleDelete}
        onAnull={(ticket) => updateState(ticket.id, TicketState.anulled)}
        onConfirm={(ticket) => updateState(ticket.id, TicketState.confirmed)}
        showDelete={currentUser?.role === 'admin'}
        onChangePage={(page) => loadTickets({ ...filters, page })}
        onChangeSize={(page, size) => loadTickets({ ...filters, page, size })}
        onChangeFilters={(_filters) => {
          setFilters?.(_filters);
          loadTickets(_filters);
          loadTotalTickets(_filters);
        }}
        total={totalTickets}
      />
    </Box>
  );
};
