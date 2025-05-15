import { useState } from 'react';
import { IHistoryItem } from '../../types';
import { useAppState } from '../providers/AppStateProvider';
import { useModalState } from './useModalState';
import { ITicketFilters } from './useSupabase';

export interface IHistoryState {
  isViewTicketModalOpen: boolean;
  closeViewTicketModal: () => void;
  openViewTicketModal: () => void;
  printTicket: (item: IHistoryItem) => void;
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  openDeleteModal: () => void;
  filters: ITicketFilters;
  setFilters: (filters: ITicketFilters) => void;
}

export const useHistoryState = (): IHistoryState => {
  const { isOpen: isViewTicketModalOpen, close: closeViewTicketModal, open: openViewTicketModal } = useModalState();
  const { isOpen: isDeleteModalOpen, close: closeDeleteModal, open: openDeleteModal } = useModalState();
  const [filters, setFilters] = useState<ITicketFilters>();
  const { setCurrentTicket } = useAppState();

  const printTicket = (ticket: IHistoryItem) => {
    setCurrentTicket(ticket);
    // Wait for screen to render before opening print dialog.
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return {
    isViewTicketModalOpen,
    closeViewTicketModal,
    openViewTicketModal,
    isDeleteModalOpen,
    closeDeleteModal,
    openDeleteModal,
    printTicket,
    filters: filters!,
    setFilters,
  };
};
