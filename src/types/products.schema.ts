import { z } from 'zod';

/**
 * DECIMAL(5,2)  → max absolute value: 999.99
 * DECIMAL(15,2) → max absolute value: 9999999999999.99
 */
const decimal5_2 = z
  .number()
  .min(-999.99, { message: 'El valor no puede ser menor a -999.99' })
  .max(999.99, { message: 'El valor no puede ser mayor a 999.99' })
  .nullable()
  .optional();

const decimal15_2 = z
  .number()
  .min(-9999999999999.99, { message: 'El valor no puede ser menor a -9999999999999.99' })
  .max(9999999999999.99, { message: 'El valor no puede ser mayor a 9999999999999.99' })
  .nullable()
  .optional();
export const importProductPropertyNames = {
  code: 'Codigo',
  code_number: 'Codigo numerico',
  code_number_text: 'Codigo numerico texto',
  description: 'Descripcion',
  price: 'Precio',
  discount_percentage: 'Bonificacion',
  discount_percentage_2: 'Bonificacion 2',
  cash_discount_1: 'Caja 1',
  cash_discount_2: 'Caja 2',
  cost: 'Costo',
  profit: 'Utilidad',
  list_price: 'Precio de Lista',
  tax: 'IVA',
  dollar: 'Dolar',
  freight: 'Flete',
  category: 'Rubro',
  card: 'Tarjeta',
} as const;
export const importProductSchema = z.object({
  // VARCHAR(50) NOT NULL
  code: z.string().min(1).max(50),
  // BIGINT — nullable, JS safe integer range is sufficient
  code_number: z.number().int().nullable().optional(),
  // VARCHAR(20)
  code_number_text: z.string().max(20).nullable().optional(),
  // VARCHAR(255)
  description: z.string().max(255).nullable().optional(),
  // DECIMAL(15,2)
  price: decimal15_2,
  // DECIMAL(5,2)
  discount_percentage: decimal5_2,
  // DECIMAL(5,2)
  discount_percentage_2: decimal5_2,
  // DECIMAL(5,2)
  cash_discount_1: decimal5_2,
  // DECIMAL(5,2)
  cash_discount_2: decimal5_2,
  // DECIMAL(15,2)
  cost: decimal15_2,
  // DECIMAL(5,2) — stored as a multiplier, e.g. 1.3 represents 30% profit
  profit: decimal5_2,
  // DECIMAL(15,2)
  list_price: decimal15_2,
  // DECIMAL(5,2)
  tax: decimal5_2,
  // DECIMAL(15,2)
  dollar: decimal15_2,
  // DECIMAL(5,2)
  freight: decimal5_2,
  // VARCHAR(100)
  category: z.string().max(255).nullable().optional(),
  // DECIMAL(5,2)
  card: decimal5_2,
});

export type ImportProductSchema = z.infer<typeof importProductSchema>;
