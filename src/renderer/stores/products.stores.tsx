import { create } from 'zustand';
import { ProductsAPI } from '../apis/products-api';
import { IDbProduct, IProductsFilters } from '../../types';
import { IFindResult } from '../../types/common';

export type ProductsStore = {
  filters: IProductsFilters;
  products: IDbProduct[];
  totalProducts: number;
  loadProducts: (_filters?: IProductsFilters) => Promise<IFindResult<IDbProduct>>;
};

export const createProductsStore = (productsApi: ProductsAPI) =>
  create<ProductsStore>((set, get) => {
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
    };
  });
