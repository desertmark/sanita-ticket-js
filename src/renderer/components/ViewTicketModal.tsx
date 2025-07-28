import { FC } from 'react';
import { Modal, ModalClose, ModalDialog, DialogTitle, Stack, Box, DialogContent } from '@mui/joy';
import { Print } from '@mui/icons-material';
import { Ticket } from './Ticket';
import { useTicketSummary } from '../hooks/useTicketSummary';
import { IHistoryItem } from '../../types';
import { Caption } from './ui/Caption';
import { RoundButton } from './ui/RoundButton';

export interface IViewTicketModalProps {
  ticket: IHistoryItem;
  isOpen?: boolean;
  isPreview?: boolean;
  onClose?: () => void;
  onPrint?: () => void;
}
export const ViewTicketModal: FC<IViewTicketModalProps> = ({ onClose, isOpen, ticket, onPrint, isPreview }) => {
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
        <DialogContent>
          <Stack spacing={2}>
            {isPreview && (
              <Caption textAlign="center" color="warning">
                Vista Previa
              </Caption>
            )}

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
              <RoundButton autoAspectRatio variant="soft" startDecorator={<Print />} onClick={onPrint}>
                Imprimir
              </RoundButton>
            )}
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
