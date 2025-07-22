import { useEffect, useState } from 'react';
import { ITicketLine, PayMethod } from '../../types';

export interface ITicketSummary {
  total: number;
  subTotal: number;
  discountAmount: number;
}
export const useTicketSummary = (
  lines: ITicketLine[],
  discount: number = 0,
  returnAmount: number = 0,
  payMethod: PayMethod = PayMethod.CASH,
): ITicketSummary => {
  const [subTotal, setSubTotal] = useState(0);
  const isCardPayMethod = [PayMethod.CREDIT, PayMethod.DEBIT].includes(payMethod);
  useEffect(() => {
    const total = lines?.reduce((acc, l) => {
      const price = isCardPayMethod ? l.product.precioTarjeta : l.product.precio;
      return acc + price * l.quantity;
    }, 0);
    setSubTotal(total);
  }, [lines, isCardPayMethod]);
  const discountAmount = ((subTotal - returnAmount) * discount) / 100;
  const total = subTotal - returnAmount - discountAmount;
  return { total, subTotal, discountAmount };
};
