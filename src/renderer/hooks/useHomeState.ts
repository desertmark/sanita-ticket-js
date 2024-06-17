/* eslint-disable no-restricted-globals */
import { ChangeEvent, useState } from 'react';
import MDBReader from 'mdb-reader';
import { IProduct, ITicketLine, PayMethod } from '../../types';
import { filterProducts, readFileAsBuffer, toProduct } from '../../utils';
import { useStorage } from './useStorage';
import { useHistoryManager } from './useHistoryManager';
import { useTicketSummary } from './useTicketSummary';
import { useSettings } from './useSupabase';
import { useAppState } from '../providers/AppStateProvider';

export interface IHomeState {
  rows: IProduct[];
  filtered: IProduct[];
  filter?: string;
  lines: ITicketLine[];
  ticketNumber: number;
  payMethod: string;
  discount: number;
  openFile?: {
    path: string;
    openTime: Date;
  };
  handleFileOpen: (e: ChangeEvent<HTMLInputElement>) => void;
  onProductSelected: (product: IProduct) => void;
  onProductDeleted: (line: ITicketLine) => void;
  onQuantityChanged: (line: ITicketLine) => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
  clearList: () => void;
  newTicket: () => void;
  onChangeTicketNumber: (value: number) => void;
  setPayMethod: (value: PayMethod) => void;
  setDiscount: (value: number) => void;
  print: () => void;
  save: () => void;
}

export const useHomeState = (): IHomeState => {
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>();
  const [lines, setLines] = useState<ITicketLine[]>([]);
  const [payMethod, setPayMethod] = useState<PayMethod>(PayMethod.CASH);
  const [discount, setDiscount] = useState<number>(0);
  const historyManager = useHistoryManager();
  const summary = useTicketSummary(lines, discount);
  const [openFile, setOpenFile] = useState<IHomeState['openFile']>();
  const { loader: appLoader } = useAppState();
  const {
    set: setRows,
    value: rows,
    remove,
  } = useStorage<IProduct[]>('products', []);
  const { settings, updateSettings } = useSettings();

  const ticketNumber = settings?.ticketNumber || 0;
  const setTicketNumber = (value: number) => {
    appLoader.waitFor(updateSettings({ ticketNumber: value }));
  };

  const isClear = lines.length === 0;
  const handleFileOpen = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const buffer = await readFileAsBuffer(file!);
      const reader = new MDBReader(buffer);
      const table = await reader.getTable('lista');
      const data = table.getData().map(toProduct);
      console.log(data[0]);
      setRows(data);
      setOpenFile({ path: file.path, openTime: new Date() });
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

  const newTicket = () => {
    if (isClear) {
      return;
    }
    clear();
    setTicketNumber(ticketNumber + 1);
  };

  const onChangeTicketNumber = (value: number) => {
    if (window.confirm('¿Está seguro de cambiar el número de ticket?')) {
      setTicketNumber(value);
    }
  };

  const print = () => {
    window.print();
  };

  const save = () => {
    try {
      historyManager.save({
        id: ticketNumber,
        ticketLines: lines,
        date: new Date().getTime(),
        payMethod,
        discount,
        subTotal: summary.subTotal,
        total: summary.total,
      });
    } catch (e: any) {
      alert(e.message);
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
    handleFileOpen,
    onProductSelected,
    onProductDeleted,
    onQuantityChanged,
    onSearch,
    clear,
    newTicket,
    onChangeTicketNumber,
    setPayMethod,
    setDiscount,
    print,
    save,
    clearList,
  };
};
