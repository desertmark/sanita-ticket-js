import { useEffect, useState } from 'react';
/**
 * Formats the given number as a 5 digits string.
 */
export const useTicketNumber = (n: number) => {
  const [ticketNumber, setTicketNumber] = useState(
    n.toString().padStart(5, '0'),
  );
  useEffect(() => {
    setTicketNumber(n.toString().padStart(5, '0'));
  }, [n]);
  return ticketNumber;
};
