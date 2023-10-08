import { useEffect, useState } from 'react';
import { now } from '../../utils';

export const useNow = () => {
  const [nowString, setNow] = useState(now());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return nowString;
};
