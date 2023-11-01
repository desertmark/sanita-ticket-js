import { useEffect, useState } from 'react';
import { ITicketLine } from '../../types';
export interface ITicketSummary {
  total: number;
  subTotal: number;
  discountAmount: number;
}
export const useTicketSummary = (
  lines: ITicketLine[],
  discount: number = 0,
): ITicketSummary => {
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    const total = lines.reduce(
      (acc, l) => acc + l.product.precio * l.quantity,
      0,
    );
    setSubTotal(total);
  }, [lines]);
  const discountAmount = (subTotal * discount) / 100;
  const total = subTotal - discountAmount;
  return { total, subTotal, discountAmount };
};
