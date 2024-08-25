import { boolean } from 'yup';
import { IHistoryItem } from '../../types';
import { useAppState } from '../providers/AppStateProvider';
import { useModalState } from './useModalState';
import { useEffect, useState } from 'react';

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
  const [printTrigger, setPrintTrigger] = useState<boolean>(false);

  const { setCurrentTicket } = useAppState();

  const printTicket = (ticket: IHistoryItem) => {
    setCurrentTicket(ticket);
    // Use a trigger and a useEffect to wait for page to render before calling window.print()
    setPrintTrigger(true);
  };

  useEffect(() => {
    if (printTrigger) {
      window.print();
      setPrintTrigger(false);
    }
  }, [printTrigger]);

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
