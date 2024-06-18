import { Box, Typography } from '@mui/joy';
import { FC } from 'react';
import { HistoryDataGrid } from '../components/HistoryDataGrid';
import { useHistoryState } from '../hooks/useHistoryState';
import { useAppState } from '../providers/AppStateProvider';
import { IHistoryItem } from '../../types';
import { ViewTicketModal } from '../components/ViewTicketModal';
import { useTicketsApi } from '../hooks/useSupabase';

export const HistoryView: FC = () => {
  const {
    openViewTicketModal,
    printTicket,
    isViewTicketModalOpen,
    closeViewTicketModal,
  } = useHistoryState();
  const { setCurrentTicket, currentTicket } = useAppState();
  const handleView = (ticket: IHistoryItem) => {
    setCurrentTicket(ticket);
    openViewTicketModal();
  };
  const { deleteTicket, tickets } = useTicketsApi();
  return (
    <Box className="history-view">
      <ViewTicketModal
        ticket={currentTicket!}
        onClose={closeViewTicketModal}
        isOpen={isViewTicketModalOpen}
        onPrint={() => printTicket(currentTicket!)}
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
        onDeleted={(ticket) => deleteTicket(ticket.id)}
      />
    </Box>
  );
};
