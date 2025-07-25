/* eslint-disable import/no-cycle */
import { AttachMoney, CreditCard, CurrencyExchange } from '@mui/icons-material';
import { IProduct, IReturnProduct } from './products';
import { ITablePagination } from './common';

export enum TicketState {
  anulled = 'annulled',
  confirmed = 'confirmed',
  returned = 'returned',
}
export interface ITicketLine {
  product: IProduct;
  quantity: number;
}
export interface IReturnTicketLine extends ITicketLine {
  return_ticket_id: number;
}
/**
 * DB Ticket representation.
 */
export interface ITicket {
  id: number;
  ticket_number: number;
  pay_method: string;
  created_at: string;
  lines: ITicketLine[];
  discount: number;
  subtotal: number;
  total: number;
  state: TicketState;
  return_ticket_id?: number;
  return_products?: IReturnProduct[];
  return_total_amount?: number;
}

export interface IApiPagination {
  from: number;
  to: number;
}

export interface ITicketFilters extends ITablePagination {
  code?: string;
  ticketFrom?: number;
  ticketTo?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

export enum PayMethod {
  CASH = 'Efectivo',
  CREDIT = 'Credito',
  DEBIT = 'Debito',
  TRANSFER = 'Transferencia',
}

export class PayMethodClass {
  static Efectivo = new PayMethodClass(PayMethod.CASH, AttachMoney, 'success');

  static Credito = new PayMethodClass(PayMethod.CREDIT, CreditCard, 'warning');

  static Debito = new PayMethodClass(PayMethod.DEBIT, CreditCard, 'primary');

  static Transferencia = new PayMethodClass(PayMethod.TRANSFER, CurrencyExchange, 'success');

  constructor(
    public name: PayMethod,
    public Icon: any,
    public color: string,
  ) {}
}
