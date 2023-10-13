import { useState } from 'react';
import { IProduct, ITicketLine } from '../../types';
import { filterProducts, readFileAsBuffer, toProduct } from '../../utils';
import MDBReader from 'mdb-reader';

export interface IHomeState {
  rows: IProduct[];
  filtered: IProduct[];
  filter?: string;
  lines: ITicketLine[];
  handleFileOpen: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProductSelected: (product: IProduct) => void;
  onProductDeleted: (line: ITicketLine) => void;
  onQuantityChanged: (line: ITicketLine) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useHomeState = (): IHomeState => {
  const [rows, setRows] = useState<IProduct[]>([]);
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState<string>();
  const [lines, setLines] = useState<ITicketLine[]>([]);

  const handleFileOpen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const buffer = await readFileAsBuffer(file!);
    const reader = new MDBReader(buffer);
    const table = await reader.getTable('lista');
    const data = table.getData().map(toProduct);
    setRows(data);
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

  return {
    rows,
    filtered,
    filter,
    lines,
    handleFileOpen,
    onProductSelected,
    onProductDeleted,
    onQuantityChanged,
    onSearch,
  };
};
