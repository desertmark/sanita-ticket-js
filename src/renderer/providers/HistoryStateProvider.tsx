import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { IHistoryItem } from '../../types';
import { useAppState } from './AppStateProvider';
import { IModalState, useModalState } from '../hooks/useModalState';
import { ITicketFilters } from '../../types/tickets';

export interface IHistoryState {
  viewTicketModal?: IModalState;
  deleteModal?: IModalState;
  filters?: ITicketFilters;
  printTicket?: (item: IHistoryItem) => void;
  setFilters?: (filters: ITicketFilters) => void;
}

const HistoryStateContext = createContext<IHistoryState>({});
export const useHistoryState = () => useContext(HistoryStateContext);

export const HistoryStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setCurrentTicket } = useAppState();
  const [filters, setFilters] = useState<ITicketFilters>({ page: 1 });
  const viewTicketModal = useModalState();
  const deleteModal = useModalState();

  const printTicket = useCallback(
    (ticket: IHistoryItem) => {
      setCurrentTicket(ticket);
      // Wait for screen to render before opening print dialog.
      setTimeout(() => {
        window.print();
      }, 100);
    },
    [setCurrentTicket],
  );

  const contextValue = useMemo(
    () => ({
      viewTicketModal,
      deleteModal,
      filters,
      printTicket,
      setFilters,
    }),
    [viewTicketModal, deleteModal, filters, printTicket, setFilters],
  );

  return <HistoryStateContext.Provider value={contextValue}>{children}</HistoryStateContext.Provider>;
};
