/* eslint-disable react/jsx-no-useless-fragment */
import { FC, PropsWithChildren, createContext, useContext, useRef } from 'react';
import { StoreApi, useStore as useZustandStore } from 'zustand';
import { createProductsStore, ProductsStore } from '../stores/products.stores';
import { useProductsApi } from '../hooks/useSupabase';

export interface RootStore {
  products: StoreApi<ProductsStore>;
}

const StoreContext = createContext<RootStore | undefined>(undefined);

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Tried to use Store outside of StoreProvider or before it was initialized');
  }
  return store;
};

export function useProductsStore<T = ProductsStore>(selector?: (state: ProductsStore) => T): T {
  const { products } = useStore();
  return useZustandStore(products, selector!);
}

// PROVIDER
export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const productsApi = useProductsApi();
  const ref = useRef<RootStore>();
  if (!ref.current) {
    ref.current = {
      products: createProductsStore(productsApi),
    };
  }
  return <StoreContext.Provider value={ref.current}>{children}</StoreContext.Provider>;
};
