import { FC } from 'react';
import { Modal, ModalClose, ModalDialog, DialogTitle, Stack, Button, Box, DialogContent } from '@mui/joy';
import { Print } from '@mui/icons-material';
import { Ticket } from './Ticket';
import { useTicketSummary } from '../hooks/useTicketSummary';
import { IHistoryItem } from '../../types';

export interface IViewTicketModalProps {
  ticket: IHistoryItem;
  isOpen?: boolean;
  isPreview?: boolean;
  onClose?: () => void;
  onPrint?: () => void;
}
export const ViewTicketModal: FC<IViewTicketModalProps> = ({ onClose, isOpen, ticket, onPrint, isPreview }) => {
  const summary = useTicketSummary(
    ticket?.ticketLines,
    ticket?.discount,
    ticket?.returnTicket?.totalCredit,
    ticket?.payMethod,
  );
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
        <DialogTitle>Ticket N° {ticket?.id} (Vista Previa)</DialogTitle>
        <DialogContent>
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
            {!isPreview && (
              <Button startDecorator={<Print />} onClick={onPrint}>
                Imprimir
              </Button>
            )}
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
