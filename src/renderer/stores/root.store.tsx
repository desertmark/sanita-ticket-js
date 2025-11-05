import { SupabaseClient } from '@supabase/supabase-js';
import { ProductsAPI } from '../apis/products-api';
import { createProductsStore } from './products.stores';

export class RootStore {
  productsApi: ProductsAPI;

  productsStore: ReturnType<typeof createProductsStore>;

  constructor(supabase: SupabaseClient) {
    this.productsApi = new ProductsAPI(supabase);
    this.productsStore = createProductsStore(this.productsApi);
  }
}
