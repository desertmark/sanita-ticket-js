import { createStore } from 'zustand';
import { ProductsAPI } from '../apis/products-api';
import { IDbProduct, IProductsFilters, ICreateProduct } from '../../types';
import { IFindResult } from '../../types/common';

export type ProductsStore = {
  filters: IProductsFilters;
  products: IDbProduct[];
  totalProducts: number;
  loadProducts: (_filters?: IProductsFilters) => Promise<IFindResult<IDbProduct>>;
  createProduct: (product: ICreateProduct) => Promise<IDbProduct>;
  reset: () => void;
};

export const createProductsStore = (productsApi: ProductsAPI) =>
  createStore<ProductsStore>((set, get, store) => {
    return {
      filters: {
        page: 1,
        size: 25,
      },
      totalProducts: 0,
      products: [],
      loadProducts: async (_filters?: IProductsFilters) => {
        const filters = {
          ...get().filters,
          ..._filters,
        };
        const response = await productsApi.findDbProducts(filters);
        set({ totalProducts: response.count, products: response.items, filters });
        return response;
      },
      createProduct: async (product: ICreateProduct) => {
        const created = await productsApi.createProduct(product);
        // Refresh the list from server
        await get().loadProducts();
        return created;
      },
      reset: () => set(store.getInitialState()),
    };
  });
