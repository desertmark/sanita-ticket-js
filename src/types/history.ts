import { IReturnProduct } from './products';
import { ITicket, ITicketLine, PayMethod, TicketState } from './tickets';

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
