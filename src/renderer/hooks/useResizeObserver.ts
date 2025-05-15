/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect } from 'react';

type ResizeObserverCallback = ConstructorParameters<typeof ResizeObserver>[0];

export const useResizeObserver = (ref: RefObject<any>, cb: ResizeObserverCallback) => {
  useEffect(() => {
    let observer: ResizeObserver;
    if (ref.current !== null) {
      observer = new ResizeObserver(cb);
      observer.observe(ref.current);
    }
    return () => observer?.disconnect();
  }, [ref.current !== null]);
};
