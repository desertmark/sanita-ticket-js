import { AttachMoney, CreditCard, CurrencyExchange } from '@mui/icons-material';
import { ITicket, TicketState } from './renderer/hooks/useSupabase';
import { IReturnProduct, IReturnTicket } from './renderer/hooks/useReturnTicket';

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

export interface IHistoryItem {
  id: number;
  ticketLines: ITicketLine[];
  payMethod: PayMethod;
  date: number;
  discount: number;
  subTotal: number;
  total: number;
  state: TicketState;
  returnTicket?: {
    ticket?: Partial<ITicket>;
    returnProducts: IReturnProduct[];
    totalCredit: number;
  };
}
