import { useState } from 'react';
import { IHistoryItem } from '../../types';
import { useAppState } from '../providers/AppStateProvider';

export interface IHistoryState {
  isViewTicketModalOpen: boolean;
  closeViewTicketModal: () => void;
  openViewTicketModal: () => void;
  printTicket: (item: IHistoryItem) => void;
}

export const useHistoryState = (): IHistoryState => {
  const [isViewTicketModalOpen, setIsViewTicketModalOpen] =
    useState<boolean>(false);
  const { setCurrentTicket } = useAppState();
  const printTicket = (ticket: IHistoryItem) => {
    setCurrentTicket(ticket);
    window.print();
  };
  const closeViewTicketModal = () => setIsViewTicketModalOpen(false);
  const openViewTicketModal = () => setIsViewTicketModalOpen(true);
  return {
    isViewTicketModalOpen,
    closeViewTicketModal,
    openViewTicketModal,
    printTicket,
  };
};
