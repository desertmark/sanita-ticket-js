import { useEffect } from 'react';

export const useLoad = (cb: () => any) => {
  useEffect(() => {
    cb();
  }, [cb]);
};
