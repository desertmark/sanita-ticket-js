import { IHistoryItem } from '../../types';
import { useAppState } from '../providers/AppStateProvider';
import { useModalState } from './useModalState';

export interface IHistoryState {
  isViewTicketModalOpen: boolean;
  closeViewTicketModal: () => void;
  openViewTicketModal: () => void;
  printTicket: (item: IHistoryItem) => void;
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  openDeleteModal: () => void;
}

export const useHistoryState = (): IHistoryState => {
  const {
    isOpen: isViewTicketModalOpen,
    close: closeViewTicketModal,
    open: openViewTicketModal,
  } = useModalState();
  const {
    isOpen: isDeleteModalOpen,
    close: closeDeleteModal,
    open: openDeleteModal,
  } = useModalState();

  const { setCurrentTicket } = useAppState();
  const printTicket = (ticket: IHistoryItem) => {
    setCurrentTicket(ticket);
    window.print();
  };

  return {
    isViewTicketModalOpen,
    closeViewTicketModal,
    openViewTicketModal,
    isDeleteModalOpen,
    closeDeleteModal,
    openDeleteModal,
    printTicket,
  };
};
