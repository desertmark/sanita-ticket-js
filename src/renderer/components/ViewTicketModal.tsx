import { FC } from 'react';
import { Modal, ModalClose, ModalDialog, DialogTitle, Stack, Button, Box } from '@mui/joy';
import { Print } from '@mui/icons-material';
import { Ticket } from './Ticket';
import { IHistoryItem } from '../../types';
import { useTicketSummary } from '../hooks/useTicketSummary';

export interface IViewTicketModalProps {
  ticket: IHistoryItem;
  isOpen?: boolean;
  onClose?: () => void;
  onPrint?: () => void;
}
export const ViewTicketModal: FC<IViewTicketModalProps> = ({ onClose, isOpen, ticket, onPrint }) => {
  const summary = useTicketSummary(ticket?.ticketLines, ticket?.discount, ticket?.returnTicket?.totalCredit);
  return (
    <Modal
      open={!!isOpen}
      onClose={onClose}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          onClose?.();
        }
      }}
    >
      <ModalDialog>
        <ModalClose />
        <DialogTitle>Ticket N° {ticket?.id}</DialogTitle>

        <Stack spacing={2}>
          <Box justifyContent="center" display="flex">
            <Ticket
              summary={summary}
              lines={ticket?.ticketLines!}
              payMethod={ticket?.payMethod!}
              ticketNumber={ticket?.id!}
              returnTicket={ticket?.returnTicket}
            />
          </Box>
          <Button startDecorator={<Print />} onClick={onPrint}>
            Imprimir
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
