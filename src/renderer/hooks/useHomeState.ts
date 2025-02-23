/* eslint-disable no-restricted-globals */
import { ChangeEvent, useState } from 'react';
import MDBReader from 'mdb-reader';
import { IHistoryItem, IProduct, IReturnTicketLine, ITicketLine, PayMethod } from '../../types';
import { debounce, filterProducts, readFileAsBuffer, toProduct } from '../../utils';
import { useStorage } from './useStorage';
import { ITicketSummary, useTicketSummary } from './useTicketSummary';
import { TicketState, useTicketsApi } from './useSupabase';
import { useAppState } from '../providers/AppStateProvider';
import { useModalState } from './useModalState';
import { useLoader } from './useLoader';
import { IReturnTicket, useReturnTicket } from './useReturnTicket';

export interface IHomeState {
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
  isViewTicketModalOpen: boolean;
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
  closeViewTicketModal: () => void;
  openViewTicketModal: () => void;
  onReturnTicketChange: (value: number) => void;
}

export const useHomeState = (): IHomeState => {
  // States
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>();
  const [lines, setLines] = useState<ITicketLine[]>([]);
  const [payMethod, setPayMethod] = useState<PayMethod>(PayMethod.CASH);
  const [discount, setDiscount] = useState<number>(0);
  const [alreadyReturnLines, setAlreadyReturnLines] = useState<IReturnTicketLine[]>([]);
  const returnTicket = useReturnTicket();

  const { set: setOpenFile, value: openFile } = useStorage<IHomeState['openFile']>('lastOpenFile', undefined as any);
  const { loader: appLoader, setCurrentTicket } = useAppState();

  const { set: setRows, value: rows, remove } = useStorage<IProduct[]>('products', []);

  const { isOpen: isViewTicketModalOpen, close: closeViewTicketModal, open: openViewTicketModal } = useModalState();
  // Loaders
  const { isLoading: isLoadingReturnTicket, waitFor: waitForReturnTicket } = useLoader();
  // APIs
  const { createTicket, lastTicket, getTicketById, getReturnLinesByReturnTicketId } = useTicketsApi();

  // Utils
  const summary = useTicketSummary(lines, discount, returnTicket.totalCredit);

  // Constants
  const ticketNumber = (lastTicket || 0) + 1;
  const isClear = lines.length === 0;

  // Methods
  const handleFileOpen = async (e: ChangeEvent<HTMLInputElement>) => {
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
  };

  const onProductSelected = (product: IProduct) => {
    const existent = lines.find((l) => l.product.id === product.id);
    if (existent) {
      existent.quantity++;
      setLines([...lines]);
    } else {
      setLines([...lines, { quantity: 1, product }]);
    }
  };

  const onProductDeleted = (line: ITicketLine) => {
    const newLines = lines.filter((l) => l.product.id !== line.product.id);
    setLines([...newLines]);
  };

  const onQuantityChanged = (line: ITicketLine) => {
    const newLines = lines.map((l) => {
      if (l.product.id === line.product.id) {
        l.quantity = line.quantity;
      }
      return l;
    });
    setLines([...newLines]);
  };
  const onReturnTicketChange = debounce(async (value: number) => {
    try {
      const ticket = await waitForReturnTicket(getTicketById(value?.toString()));
      const alreadyReturnLinesRes = await waitForReturnTicket(getReturnLinesByReturnTicketId(value?.toString()));
      returnTicket.setTicket(ticket);
      setAlreadyReturnLines(alreadyReturnLinesRes);
    } catch {
      if (value) {
        alert(`No se encontro el Ticket Nro: ${value}`);
      }
      returnTicket.setTicket(undefined);
    }
  }, 1000);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredRows = rows.filter(filterProducts(e.target.value));
    setFiltered(filteredRows);
    setFilter(e.target.value);
  };

  const clear = () => {
    setFiltered([]);
    setFilter('');
    setLines([]);
    setDiscount(0);
    setPayMethod(PayMethod.CASH);
    returnTicket.clear();
  };

  const clearList = () => {
    remove();
    setOpenFile(undefined);
  };

  const printTicket = () => {
    window.print();
  };

  const save = async () => {
    try {
      if (isClear) {
        throw new Error('No hay productos en la lista');
      }
      const historyItem: IHistoryItem = {
        id: ticketNumber,
        ticketLines: lines,
        date: new Date().getTime(),
        payMethod,
        discount,
        subTotal: summary.subTotal,
        total: summary.total,
        state: TicketState.confirmed,
        returnTicket,
      };
      await appLoader.waitFor(createTicket(historyItem));
      setCurrentTicket(historyItem);
      openViewTicketModal();
      clear();
    } catch (e: any) {
      alert(`No se pudo guardar el ticket: ${e.message}`);
    }
  };

  return {
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
    setPayMethod,
    setDiscount,
    printTicket,
    save,
    clearList,
    closeViewTicketModal,
    openViewTicketModal,
    onReturnTicketChange,
  };
};
