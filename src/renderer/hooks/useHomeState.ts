/* eslint-disable no-restricted-globals */
import { ChangeEvent, useState } from 'react';
import MDBReader from 'mdb-reader';
import { IHistoryItem, IProduct, ITicketLine, PayMethod } from '../../types';
import { filterProducts, readFileAsBuffer, toProduct } from '../../utils';
import { useStorage } from './useStorage';
import { useTicketSummary } from './useTicketSummary';
import { TicketState, useTicketsApi } from './useSupabase';
import { useAppState } from '../providers/AppStateProvider';
import { useModalState } from './useModalState';

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
}

export const useHomeState = (): IHomeState => {
  // States
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>();
  const [lines, setLines] = useState<ITicketLine[]>([]);
  const [payMethod, setPayMethod] = useState<PayMethod>(PayMethod.CASH);
  const [discount, setDiscount] = useState<number>(0);
  const { set: setOpenFile, value: openFile } = useStorage<
    IHomeState['openFile']
  >('lastOpenFile', undefined as any);
  const { loader: appLoader, setCurrentTicket } = useAppState();

  const {
    set: setRows,
    value: rows,
    remove,
  } = useStorage<IProduct[]>('products', []);

  const {
    isOpen: isViewTicketModalOpen,
    close: closeViewTicketModal,
    open: openViewTicketModal,
  } = useModalState();

  // APIs
  const { createTicket, lastTicket } = useTicketsApi();

  // Utils
  const summary = useTicketSummary(lines, discount);

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
  };
};
