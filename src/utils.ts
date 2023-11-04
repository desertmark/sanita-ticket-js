import { IProduct } from './types';

export const today = () => {
  const dateFormat = new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const today = new Date();
  return dateFormat.format(today);
};

export const now = () => {
  const timeFormat = new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const now = new Date();
  return timeFormat.format(now);
};

export const filterProducts = (term: string) => (p: IProduct) => {
  return (
    term === p.id.toString() ||
    p.codigo?.replace(/\./gm, '').includes(term) ||
    p.codigo?.includes(term) ||
    p.descripcion?.toLowerCase()?.includes(term.toLowerCase())
  );
};

export function readFileAsBuffer(file: File): Promise<Buffer> {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const buffer: any[] = event.target?.result as unknown as any;
      resolve(Buffer.from(buffer));
    };

    reader.onerror = (event) => {
      reject(event.target?.error);
    };

    reader.readAsArrayBuffer(file);
  });
}

export const toProduct = (row: any, id: number): IProduct => {
  const costo = ProductCalculator.cost(row.pl, toDecimalProportion(row.iva), [
    toDecimalProportion(row.caja1),
    toDecimalProportion(row.caja2),
    toDecimalProportion(row.bonif),
    toDecimalProportion(row.bonif2),
  ]);
  const precio = ProductCalculator.price(
    costo,
    fromMultiplierToDecimalProportion(row.utilidad),
    toDecimalProportion(row.flete),
  );
  const precioTarjeta = ProductCalculator.cardPrice(
    precio,
    toDecimalProportion(row.tarjeta),
  );
  return {
    id,
    codigo: row.codigo,
    descripcion: row.descripcion,
    precio,
    precioTarjeta,
  };
};

export const minMaxFormatter = (
  value: number,
  min: number,
  max: number,
): number => {
  if (value > max) {
    return max;
  }
  if (value < min) {
    return min;
  }
  return value;
};

export class ProductCalculator {
  static cost(
    listPrice: number,
    vat: number,
    discounts: number[] = [],
  ): number {
    const totalDiscount: number = discounts.reduce(
      (acc, discount) => acc + discount,
      0,
    );
    const cost = (listPrice * (1 + vat - totalDiscount)).toFixed(2);
    return parseFloat(cost);
  }

  static price(cost: number, utility: number, transport: number): number {
    return parseFloat((cost * (1 + utility + transport)).toFixed(2));
  }

  static cardPrice(price: number, card: number): number {
    return parseFloat((price * (1 + card)).toFixed(2));
  }
}

/**
 * Transform proportional multipliers like 1.3 (used to add a 30%) to 0.3.
 */
export const fromMultiplierToDecimalProportion = (num: number) => {
  return +(num - 1).toFixed(2);
};
/**
 * Transforms percentages like 30 to 0.3 with no more than 2 decimals.
 */
export const toDecimalProportion = (num: number) => {
  return +(num / 100).toFixed(2);
};
