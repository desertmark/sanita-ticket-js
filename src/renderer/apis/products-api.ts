/* eslint-disable class-methods-use-this */
import { SupabaseClient } from '@supabase/supabase-js';
import { IDbProduct, IMDBProduct, IProduct, IProductsFilters } from '../../types';
import { fromItems, toImportProduct, toItems, toProductFromDbProduct } from '../../utils';
import { IFindResult } from '../../types/common';
import { ISettings, SettingKeys } from '../../types/settings';

const DEFAULT_PRODUCT_FILTERS: IProductsFilters = {
  code: '',
  description: '',
  page: 1,
  size: 10,
};
export class ProductsAPI {
  constructor(private supabase: SupabaseClient) {
    this.importProducts = this.importProducts.bind(this);
    this.findProducts = this.findProducts.bind(this);
    this.upsertProductSettings = this.upsertProductSettings.bind(this);
    this.getProductsSettings = this.getProductsSettings.bind(this);
  }

  /**
   * Imports products from an array of IMDBProduct to the database.
   * Deletes existing products before importing new ones.
   * @param mdbProducts - Array of products to import.
   */
  async importProducts(mdbProducts: IMDBProduct[]) {
    const importProducts = mdbProducts.map(toImportProduct);
    // Delete all existing products
    const { error: deleteError } = await this.supabase.from('products').delete().neq('code', '');
    if (deleteError) {
      console.error('Error deleting existing products:', deleteError);
      throw deleteError;
    }
    // Import new products
    const { error } = await this.supabase.from('products').insert(importProducts);
    if (error) {
      console.error('Error importing products:', error);
      throw error;
    }
  }

  async upsertProductSettings(settings: ISettings) {
    // Update import metadata
    const { error: metadataError } = await this.supabase.from('settings').upsert([
      { key: SettingKeys.PRODUCTS_IMPORT_LAST_UPDATED_AT, value: new Date().toISOString() },
      { key: SettingKeys.PRODUCTS_IMPORT_LAST_UPDATE_BY, value: settings.updatedLastBy },
      {
        key: SettingKeys.PRODUCTS_IMPORT_LAST_UPDATE_FILE,
        value: settings.updatedLastFile,
      },
      {
        key: SettingKeys.PRODUCTS_IMPORT_LAST_UPDATE_FROM,
        value: settings.updatedLastFrom,
      },
    ]);
    if (metadataError) {
      console.error('Error updating import metadata:', metadataError);
      throw metadataError;
    }
  }

  async getProductsSettings(): Promise<ISettings> {
    try {
      const { data, error } = await this.supabase
        .from('settings')
        .select<'*', { key: SettingKeys; value: string }>('*')
        .in('key', [
          SettingKeys.PRODUCTS_IMPORT_LAST_UPDATED_AT,
          SettingKeys.PRODUCTS_IMPORT_LAST_UPDATE_BY,
          SettingKeys.PRODUCTS_IMPORT_LAST_UPDATE_FILE,
          SettingKeys.PRODUCTS_IMPORT_LAST_UPDATE_FROM,
        ]);
      if (error) {
        console.error('Error fetching product settings:', error);
        throw error;
      }
      const settings: ISettings = {
        updatedLastAt: data.find((d) => d.key === SettingKeys.PRODUCTS_IMPORT_LAST_UPDATED_AT)?.value,
        updatedLastBy: data.find((d) => d.key === SettingKeys.PRODUCTS_IMPORT_LAST_UPDATE_BY)?.value,
        updatedLastFile: data.find((d) => d.key === SettingKeys.PRODUCTS_IMPORT_LAST_UPDATE_FILE)?.value,
        updatedLastFrom: data.find((d) => d.key === SettingKeys.PRODUCTS_IMPORT_LAST_UPDATE_FROM)?.value,
      };
      return settings;
    } catch (error) {
      console.error('Error in getProductsSettings:', error);
      throw error;
    }
  }

  /**
   * Finds products based on the provided filters.
   * @param _filters - Filters to apply when searching for products.
   * @returns A promise that resolves to a result containing the found products and their count.
   */
  async findProducts(_filters: IProductsFilters = DEFAULT_PRODUCT_FILTERS): Promise<IFindResult<IProduct>> {
    const filters = { ...DEFAULT_PRODUCT_FILTERS, ..._filters };
    const from = fromItems(filters.page, filters.size!);
    const to = toItems(from, filters.size!);
    const { data, error, count } = await this.supabase
      .from('products')
      .select<'*', IDbProduct>('*', { count: 'exact' })
      .or(
        `code.ilike.*${filters.code}*,code_number_text.ilike.*${filters.code}*,description.ilike.*${filters.description}*`,
      )
      .range(from, to);
    if (error) {
      throw error;
    }
    return {
      items: data.map(toProductFromDbProduct),
      count: count || 0,
    };
  }
}
