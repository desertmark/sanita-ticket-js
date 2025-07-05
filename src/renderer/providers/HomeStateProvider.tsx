/* eslint-disable no-restricted-globals */
import { FC, PropsWithChildren, createContext, useCallback, useContext, useState, ChangeEvent, useMemo } from 'react';
import MDBReader from 'mdb-reader';
import { debounce, filterProducts, readFileAsBuffer, toProduct } from '../../utils';
import { useStorage } from '../hooks/useStorage';
import { ITicketSummary, useTicketSummary } from '../hooks/useTicketSummary';
import { useTicketsApi } from '../hooks/useSupabase';
import { useAppState } from './AppStateProvider';
import { IModalState, useModalState } from '../hooks/useModalState';
import { useLoader } from '../hooks/useLoader';
import { IReturnTicket, useReturnTicket } from '../hooks/useReturnTicket';
import { useAsync } from '../hooks/useAsync';
import { IReturnTicketLine, ITicketLine, PayMethod, TicketState, IProduct, IHistoryItem } from '../../types';

export interface IHomeStateContextType {
  isViewTicketModalOpen: boolean;
  rows: IProduct[];
  filtered: IProduct[];
  filter?: string;
  lines: ITicketLine[];
  ticketNumber: number;
  payMethod: PayMethod;
  discount: number;
  openFile?: {
    path: string;
    openTime: string;
  };
  viewTicketModal?: IModalState;
  summary: ITicketSummary;
  returnTicket: IReturnTicket;
  alreadyReturnLines: IReturnTicketLine[];
  isLoadingReturnTicket: boolean;
  handleFileOpen: (e: ChangeEvent<HTMLInputElement>) => void;
  onProductSelected: (product: IProduct) => void;
  onProductDeleted: (line: ITicketLine) => void;
  onQuantityChanged: (line: ITicketLine) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
  clearList: () => void;
  setPayMethod: (value: PayMethod) => void;
  setDiscount: (value: number) => void;
  printTicket: () => void;
  save: () => void;
  onReturnTicketChange: (value: number) => void;
  closeViewTicketModal: () => void;
  openViewTicketModal: () => void;
}

const defaults: IHomeStateContextType = {
  isViewTicketModalOpen: false,
  rows: [],
  filtered: [],
  lines: [],
  ticketNumber: 0,
  payMethod: PayMethod.CASH,
  discount: 0,
  summary: {
    subTotal: 0,
    discountAmount: 0,
    total: 0,
  },
  returnTicket: {
    ticket: undefined,
    totalCredit: 0,
    returnProducts: [],
    ref: { current: null },
    setTicket: () => {},
    addReturnProduct: () => {},
    removeReturnProduct: () => {},
    clear: () => {},
  },
  alreadyReturnLines: [],
  isLoadingReturnTicket: false,
  handleFileOpen: () => {},
  onProductSelected: () => {},
  onProductDeleted: () => {},
  onQuantityChanged: () => {},
  onSearch: () => {},
  clear: () => {},
  clearList: () => {},
  setPayMethod: () => {},
  setDiscount: () => {},
  printTicket: () => {},
  save: () => {},
  onReturnTicketChange: () => {},
  openViewTicketModal: () => {},
  closeViewTicketModal: () => {},
};

const HomeStateContext = createContext<IHomeStateContextType>(defaults);

export const useHomeState = (): IHomeStateContextType => useContext(HomeStateContext);

// PROVIDER
export const HomeStateProvider: FC<PropsWithChildren> = ({ children }) => {
  // States
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>();
  const [lines, setLines] = useState<ITicketLine[]>([]);
  const [payMethod, setPayMethod] = useState<PayMethod>(PayMethod.CASH);
  const [discount, setDiscount] = useState<number>(0);
  const [alreadyReturnLines, setAlreadyReturnLines] = useState<IReturnTicketLine[]>([]);
  const returnTicket = useReturnTicket();
  const { isOpen: isViewTicketModalOpen, open: openViewTicketModal, close: closeViewTicketModal } = useModalState();
  // Storages
  const { set: setOpenFile, value: openFile } = useStorage<IHomeStateContextType['openFile']>(
    'lastOpenFile',
    undefined as any,
  );
  const { set: setRows, value: rows, remove } = useStorage<IProduct[]>('products', []);
  // Loaders
  const { isLoading: isLoadingReturnTicket, waitFor: waitForReturnTicket } = useLoader();
  const {
    loader: { waitFor: waitForApp },
    setCurrentTicket,
  } = useAppState();
  // APIs
  const { createTicket, findLastTicketNumber, findTicketById, findReturnLinesByReturnTicketId } = useTicketsApi();
  // Asyncs
  const { data: lastTicket, refresh: refreshLastTicket } = useAsync(findLastTicketNumber, undefined, 0);
  // Utils
  const summary = useTicketSummary(lines, discount, returnTicket.totalCredit, payMethod);
  // Constants
  const ticketNumber = (lastTicket || 0) + 1;
  const isClear = lines.length === 0;
  const { clear: clearReturnTicket, setTicket: setReturnTicket } = returnTicket;

  // Methods
  const handleFileOpen = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const buffer = await readFileAsBuffer(file!);
        const reader = new MDBReader(buffer);
        const table = await reader.getTable('lista');
        const data = table.getData().map(toProduct);
        console.log(data[0]);
        setRows(data);
        setOpenFile({ path: file.path, openTime: new Date().toISOString() });
      }
      e.target.value = null as any;
    },
    [setRows, setOpenFile],
  );

  const onProductSelected = useCallback(
    (product: IProduct) => {
      const existent = lines.find((l) => l.product.id === product.id);
      if (existent) {
        existent.quantity++;
        setLines([...lines]);
      } else {
        setLines([...lines, { quantity: 1, product }]);
      }
    },
    [lines, setLines],
  );

  const onProductDeleted = useCallback(
    (line: ITicketLine) => {
      const newLines = lines.filter((l) => l.product.id !== line.product.id);
      setLines([...newLines]);
    },
    [lines, setLines],
  );

  const onQuantityChanged = useCallback(
    (line: ITicketLine) => {
      if (line.quantity <= 0) {
        onProductDeleted(line);
        return;
      }
      const newLines = lines.map((l) => {
        if (l.product.id === line.product.id) {
          l.quantity = line.quantity;
        }
        return l;
      });
      setLines([...newLines]);
    },
    [lines, setLines, onProductDeleted],
  );

  const onReturnTicketChange = useMemo(
    () =>
      debounce(async (value: number) => {
        try {
          const ticket = await waitForReturnTicket(findTicketById(value));
          const alreadyReturnLinesRes = await waitForReturnTicket(findReturnLinesByReturnTicketId(value?.toString()));
          setReturnTicket(ticket);
          setAlreadyReturnLines(alreadyReturnLinesRes);
        } catch {
          if (value) {
            alert(`No se encontro el Ticket Nro: ${value}`);
          }
          setReturnTicket(undefined);
        }
      }, 1000),
    [waitForReturnTicket, findTicketById, findReturnLinesByReturnTicketId, setReturnTicket],
  );

  const onSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const filteredRows = rows.filter(filterProducts(e.target.value));
      setFiltered(filteredRows);
      setFilter(e.target.value);
    },
    [rows],
  );

  const clear = useCallback(() => {
    setFiltered([]);
    setFilter('');
    setLines([]);
    setDiscount(0);
    setPayMethod(PayMethod.CASH);
    clearReturnTicket();
  }, [clearReturnTicket]);

  const clearList = useCallback(() => {
    remove();
    setOpenFile(undefined);
  }, [remove, setOpenFile]);

  const printTicket = useCallback(() => {
    window.print();
  }, []);

  const save = useCallback(async () => {
    try {
      if (isClear) {
        throw new Error('No hay productos en la lista');
      }
      const lasTicketNumber = await waitForApp(findLastTicketNumber());
      const historyItem: IHistoryItem = {
        id: lasTicketNumber + 1,
        ticketLines: lines,
        date: new Date().getTime(),
        payMethod,
        discount,
        subTotal: summary.subTotal,
        total: summary.total,
        state: TicketState.confirmed,
        returnTicket,
      };
      await waitForApp(createTicket(historyItem));
      waitForApp(refreshLastTicket());
      setCurrentTicket(historyItem);
      openViewTicketModal();
      clear();
    } catch (e: any) {
      alert(`No se pudo guardar el ticket: ${e.message}`);
    }
  }, [
    isClear,
    lines,
    payMethod,
    discount,
    summary.subTotal,
    summary.total,
    returnTicket,
    waitForApp,
    createTicket,
    refreshLastTicket,
    setCurrentTicket,
    openViewTicketModal,
    clear,
    findLastTicketNumber,
  ]);

  const value = useMemo(
    () => ({
      rows,
      filtered,
      filter,
      lines,
      ticketNumber,
      payMethod,
      discount,
      openFile,
      isViewTicketModalOpen,
      summary,
      returnTicket,
      alreadyReturnLines,
      isLoadingReturnTicket,
      handleFileOpen,
      onProductSelected,
      onProductDeleted,
      onQuantityChanged,
      onSearch,
      clear,
      clearList,
      setPayMethod,
      setDiscount,
      printTicket,
      save,
      onReturnTicketChange,
      closeViewTicketModal,
      openViewTicketModal,
    }),
    [
      rows,
      filtered,
      filter,
      lines,
      ticketNumber,
      payMethod,
      discount,
      openFile,
      isViewTicketModalOpen,
      summary,
      returnTicket,
      alreadyReturnLines,
      isLoadingReturnTicket,
      handleFileOpen,
      onProductSelected,
      onProductDeleted,
      onQuantityChanged,
      onSearch,
      clear,
      clearList,
      setPayMethod,
      setDiscount,
      printTicket,
      save,
      closeViewTicketModal,
      openViewTicketModal,
      onReturnTicketChange,
    ],
  );

  return <HomeStateContext.Provider value={value}>{children}</HomeStateContext.Provider>;
};
