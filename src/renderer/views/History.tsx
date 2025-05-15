import { Box, Stack, Typography } from '@mui/joy';
import { FC } from 'react';
import { Warning } from '@mui/icons-material';
import { HistoryDataGrid } from '../components/HistoryDataGrid';
import { useHistoryState } from '../hooks/useHistoryState';
import { useAppState } from '../providers/AppStateProvider';
import { IHistoryItem } from '../../types';
import { ViewTicketModal } from '../components/ViewTicketModal';
import { TicketState, useTicketsApi } from '../hooks/useSupabase';
import { ConfirmModal } from '../components/ConfirmModal';

export const HistoryView: FC = () => {
  const state = useHistoryState();
  const { setCurrentTicket, currentTicket, loader: appLoader, currentUser } = useAppState();
  const { deleteTicket, tickets, updateState, loadTickets, totalTickets } = useTicketsApi();

  const handleView = (ticket: IHistoryItem) => {
    setCurrentTicket(ticket);
    state.openViewTicketModal();
  };

  const handleDeleteConfirm = async () => {
    try {
      await appLoader.waitFor(deleteTicket(currentTicket!.id));
      state.closeDeleteModal();
    } catch (e: Error | any) {
      alert(`No se pudo eliminar el ticket: ${e.message}`);
    }
  };

  const handleDelete = async (ticket: IHistoryItem) => {
    setCurrentTicket(ticket);
    state.openDeleteModal();
  };

  return (
    <Box className="history-view">
      <ViewTicketModal
        ticket={currentTicket!}
        onClose={state.closeViewTicketModal}
        isOpen={state.isViewTicketModalOpen}
        onPrint={() => state.printTicket(currentTicket!)}
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
        isOpen={state.isDeleteModalOpen}
        onClose={state.closeDeleteModal}
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
        onPrint={state.printTicket}
        onView={handleView}
        onDelete={handleDelete}
        onAnull={(ticket) => updateState(ticket.id, TicketState.anulled)}
        onConfirm={(ticket) => updateState(ticket.id, TicketState.confirmed)}
        showDelete={currentUser?.role === 'admin'}
        onChangePage={(page) => loadTickets({ ...state.filters, page })}
        onChangeSize={(page, size) => loadTickets({ ...state.filters, page, size })}
        onChangeFilters={(filters) => {
          state.setFilters(filters);
          loadTickets(filters);
        }}
        total={totalTickets}
      />
    </Box>
  );
};
