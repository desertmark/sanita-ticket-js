import { Box, Stack, Typography } from '@mui/joy';
import { FC } from 'react';
import { HistoryDataGrid } from '../components/HistoryDataGrid';
import { useHistoryState } from '../hooks/useHistoryState';
import { useAppState } from '../providers/AppStateProvider';
import { IHistoryItem } from '../../types';
import { ViewTicketModal } from '../components/ViewTicketModal';
import { useTicketsApi } from '../hooks/useSupabase';
import { ConfirmModal } from '../components/ConfirmModal';
import { Warning } from '@mui/icons-material';

export const HistoryView: FC = () => {
  const state = useHistoryState();
  const { setCurrentTicket, currentTicket, loader: appLoader } = useAppState();
  const { deleteTicket, tickets } = useTicketsApi();

  const handleView = (ticket: IHistoryItem) => {
    setCurrentTicket(ticket);
    state.openViewTicketModal();
  };
  const handleDelete = async (ticket: IHistoryItem) => {
    try {
      await appLoader.waitFor(deleteTicket(ticket.id));
    } catch (e: Error | any) {
      alert(`No se pudo eliminar el ticket: ${e.message}`);
    }
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
            <Typography level="body-md">
              ¿Estas seguro que deseas eliminar el ticket?
            </Typography>
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
        onConfirm={() => handleDelete(currentTicket!)}
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
        onDeleted={state.openDeleteModal}
      />
    </Box>
  );
};
