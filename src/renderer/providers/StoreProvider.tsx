/* eslint-disable react/jsx-no-useless-fragment */
import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { RootStore } from '../stores/root.store';
import { ProductsStore } from '../stores/products.stores';

const StoreContext = createContext<RootStore | undefined>(undefined);

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Tried to use Store outside of StoreProvider or before it was initialized');
  }
  return store;
};

export function useProductsStore<T = ProductsStore>(selector?: (state: ProductsStore) => T): T {
  const { productsStore } = useStore();
  return productsStore(selector!);
}

// PROVIDER
export const StoreProvider: FC<PropsWithChildren<{ store: RootStore }>> = ({ children, store }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
