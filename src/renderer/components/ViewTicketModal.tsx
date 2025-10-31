import { FC } from 'react';
import { Modal, ModalClose, ModalDialog, DialogTitle, Stack, Box, DialogContent } from '@mui/joy';
import { Print } from '@mui/icons-material';
import { Ticket } from './Ticket';
import { useTicketSummary } from '../hooks/useTicketSummary';
import { IHistoryItem } from '../../types';
import { RoundButton } from './ui/RoundButton';
import { Caption } from './ui/Caption';

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
      <ModalDialog sx={{ minWidth: 0, width: '224px' }}>
        <ModalClose />
        <DialogTitle>Ticket N° {ticket?.id}</DialogTitle>
        {isPreview && (
          <Caption textAlign="center" color="warning">
            Vista Previa
          </Caption>
        )}
        <DialogContent>
          <Stack spacing={3}>
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
