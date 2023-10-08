import { useEffect, useState } from 'react';
import { ITicketLine } from '../../types';

export const useTotal = (lines: ITicketLine[]) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const total = lines.reduce(
      (acc, l) => acc + l.product.precio * l.quantity,
      0,
    );
    setTotal(total);
  }, [lines]);
  return total;
};
