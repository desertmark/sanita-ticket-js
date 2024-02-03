import { useState } from 'react';
import { IProduct, ITicketLine } from '../../types';
import { filterProducts, readFileAsBuffer, toProduct } from '../../utils';
import MDBReader from 'mdb-reader';
import { useStorage } from './useStorage';

export interface IHomeState {
  rows: IProduct[];
  filtered: IProduct[];
  filter?: string;
  lines: ITicketLine[];
  ticketNumber: number;
  payMethod: string;
  discount: number;
  handleFileOpen: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProductSelected: (product: IProduct) => void;
  onProductDeleted: (line: ITicketLine) => void;
  onQuantityChanged: (line: ITicketLine) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
  newTicket: () => void;
  onChangeTicketNumber: (value: number) => void;
  setPayMethod: (value: string) => void;
  setDiscount: (value: number) => void;
}

export const useHomeState = (): IHomeState => {
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>();
  const [lines, setLines] = useState<ITicketLine[]>([]);
  const [payMethod, setPayMethod] = useState<string>('Efectivo');
  const [discount, setDiscount] = useState<number>(0);

  const { set: setRows, value: rows } = useStorage<IProduct[]>('products', []);

  const { value: ticketNumber, set: setTicketNumber } = useStorage(
    'lastTicket',
    0,
  );
  const isClear = lines.length === 0;
  const handleFileOpen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const buffer = await readFileAsBuffer(file!);
      const reader = new MDBReader(buffer);
      const table = await reader.getTable('lista');
      const data = table.getData().map(toProduct);
      console.log(data[0])
      setRows(data);
    }
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

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = rows.filter(filterProducts(e.target.value));
    setFiltered(filtered);
    setFilter(e.target.value);
  };

  const clear = () => {
    setFiltered([]);
    setFilter('');
    setLines([]);
    setDiscount(0);
    setPayMethod('Efectivo');
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

  return {
    rows,
    filtered,
    filter,
    lines,
    ticketNumber,
    payMethod,
    discount,
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
  };
};
