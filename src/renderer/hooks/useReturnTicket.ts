import { useMemo, useState } from 'react';
import { ITicket } from './useSupabase';
import { ITicketLine } from '../../types';
import { ProductCalculator } from '../../utils';

export interface IReturnTicket {
  ticket?: ITicket;
  totalCredit: number;
  returnProducts: IReturnProduct[];
  setTicket: (ticket?: ITicket) => void;
  addReturnProduct: (line: ITicketLine) => void;
  removeReturnProduct: (line: ITicketLine) => void;
}
export interface IReturnProduct {
  line: ITicketLine;
  returnAmount: number;
}

export const useReturnTicket = (_ticket?: ITicket): IReturnTicket => {
  const [ticket, _setTicket] = useState<ITicket | undefined>(_ticket);
  const [returnProducts, setReturnProducts] = useState<IReturnProduct[]>([]);

  const totalCredit = useMemo(() => {
    return returnProducts.reduce((acum, returnProduct) => {
      return acum + returnProduct.returnAmount;
    }, 0);
  }, [returnProducts]);

  const addReturnProduct = (line: ITicketLine) => {
    const returnAmount = ProductCalculator.returnAmount(ticket!, line);
    setReturnProducts([...returnProducts, { line, returnAmount }]);
  };

  const removeReturnProduct = (line: ITicketLine) => {
    setReturnProducts(returnProducts.filter((p) => p.line.product.id !== line.product.id));
  };

  const setTicket = (t?: ITicket) => {
    _setTicket(t);
    setReturnProducts([]);
  };

  return {
    ticket,
    totalCredit,
    returnProducts,
    setTicket,
    addReturnProduct,
    removeReturnProduct,
  };
};
