/* eslint-disable import/no-cycle */
import { ITablePagination } from './common';
import { ITicketLine } from './tickets';
/**
 * Represents a product in the Ticket generation process.
 */
export interface IProduct {
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
  precioTarjeta: number;
}
export interface IReturnProduct {
  line: ITicketLine;
  returnAmount: number;
}

/**
 * Represents a product in the MDB file.
 * ```typescript
 * {
 *   precio: 50.060001373291016,
 *   bonif: 40,
 *   caja1: 9,
 *   caja2: 9,
 *   costo: 38.5099983215332,
 *   utilidad: 1.2999999523162842,
 *   pl: 56.189998626708984,
 *   iva: 21,
 *   dolar: 6.420000076293945,
 *   flete: 14,
 *   codigo: '01.01.00.03',
 *   descripcion: 'ABRAZADERAS T/AMERICANO 9-20   N* 0',
 *   rubro: 'ABRAZADERAS CARBIZ',
 *   bonif2: 0,
 *   tarjeta: 23
 * }
 * ```
 */
export interface IMDBProduct extends Record<string, any> {
  precio: number;
  bonif: number;
  caja1: number;
  caja2: number;
  costo: number;
  utilidad: number;
  pl: number;
  iva: number;
  dolar: number;
  flete: number;
  codigo: string;
  descripcion: string;
  rubro: string;
  bonif2: number;
  tarjeta: number;
}

/**
 * Represents a product in the database.
 */
export interface IDbProduct {
  /** Unique identifier for the product */
  id: number;
  /** Product code */
  code: string;
  /** Numeric representation of the product code */
  code_number: number;
  /** Product description */
  description: string;
  /** Product price */
  price: number;
  /** Discount percentage */
  discount_percentage: number;
  /** Secondary discount percentage */
  discount_percentage_2: number;
  /** First cash discount percentage */
  cash_discount_1: number;
  /** Second cash discount percentage */
  cash_discount_2: number;
  /** Product cost */
  cost: number;
  /** Profit percentage multiplier (e.g., 1.3 = 30% profit) */
  profit: number;
  /** List price */
  list_price: number;
  /** Tax percentage */
  tax: number;
  /** Dollar price */
  dollar: number;
  /** Freight percentage (transportation) */
  freight: number;
  /** Product category */
  category: string;
  /** Card percentage */
  card: number;
  /** Creation timestamp */
  created_at: Date;
  /** Last update timestamp */
  updated_at: Date;
}

export type IImportProduct = Omit<IDbProduct, 'id' | 'created_at' | 'updated_at'>;

export interface IProductsFilters extends ITablePagination {
  code?: string;
  description?: string;
}
