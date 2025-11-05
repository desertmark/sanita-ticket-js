import { create } from 'zustand';
import { ProductsAPI } from '../apis/products-api';
import { IDbProduct } from '../../types';
import { IFindResult } from '../../types/common';

export type ProductsStore = {
  products: IDbProduct[];
  loadProducts: () => Promise<IFindResult<IDbProduct>>;
};

export const createProductsStore = (productsApi: ProductsAPI) =>
  create<ProductsStore>((set) => {
    return {
      products: [],
      loadProducts: async () => {
        const response = await productsApi.findDbProducts();
        set({ products: response.items });
        return response;
      },
    };
  });
