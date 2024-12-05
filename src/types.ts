import { TicketState } from './renderer/hooks/useSupabase';

export interface IProduct {
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
  precioTarjeta: number;
}

export interface ITicketLine {
  product: IProduct;
  quantity: number;
}

export enum PayMethod {
  CASH = 'Efectivo',
  CREDIT = 'Credito',
  DEBIT = 'Debito',
  TRANSFER = 'Transferencia',
}

export interface IHistoryItem {
  id: number;
  ticketLines: ITicketLine[];
  payMethod: PayMethod;
  date: number;
  discount: number;
  subTotal: number;
  total: number;
  state: TicketState;
}
