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
}

export interface IHistoryItem {
  id: number;
  ticketLines: ITicketLine[];
  payMethod: PayMethod;
  date: number;
  discount: number;
  subTotal: number;
  total: number;
}
