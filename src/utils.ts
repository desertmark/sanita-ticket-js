import { IHistoryItem } from './types/history';
import { ITicket, ITicketLine, PayMethod, IImportProduct, IMDBProduct, IProduct, IDbProduct } from './types';

export const DECIMALS = 2;
export const MIN_DATE = new Date(0);
export const MAX_DATE = new Date(99999999999999);

export const fromItems = (page: number, size: number) => (page - 1) * size;
export const toItems = (from: number, size: number) => from + size - 1;

export const today = () => {
  const dateFormat = new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const timestamp = new Date();
  return dateFormat.format(timestamp);
};

export const now = () => {
  const timeFormat = new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const timestamp = new Date();
  return timeFormat.format(timestamp);
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

export const toProduct = (row: IMDBProduct, id: number): IProduct => {
  return {
    id,
    codigo: row.codigo,
    descripcion: row.descripcion,
    precio: row.precio,
    precioTarjeta: ProductCalculator.cardPrice(row.precio, toDecimalProportion(row.tarjeta)),
  };
};
export const toProductFromDbProduct = (p: IDbProduct): IProduct => {
  return {
    id: p.id,
    codigo: p.code,
    descripcion: p.description,
    precio: p.price,
    precioTarjeta: ProductCalculator.cardPrice(p.price, toDecimalProportion(p.card)),
  };
};

export const toImportProduct = (p: IMDBProduct): IImportProduct => {
  return {
    code: p.codigo,
    code_number: parseInt(p.codigo.replace(/\./g, '')),
    description: p.descripcion,
    price: p.precio,
    discount_percentage: p.bonif,
    discount_percentage_2: p.bonif2,
    cash_discount_1: p.caja1,
    cash_discount_2: p.caja2,
    cost: p.costo,
    profit: p.utilidad,
    list_price: p.pl,
    tax: p.iva,
    dollar: p.dolar,
    freight: p.flete,
    category: p.rubro,
    card: p.tarjeta,
  };
};

// How to recalculate price. Is wrong, transport must be part of the cost not the price.
// export const toProduct = (row: any, id: number): IProduct => {
//   const costo = ProductCalculator.cost(row.pl, toDecimalProportion(row.iva), [
//     toDecimalProportion(row.caja1),
//     toDecimalProportion(row.caja2),
//     toDecimalProportion(row.bonif),
//     toDecimalProportion(row.bonif2),
//   ]);
//   const precio = ProductCalculator.price(
//     costo,
//     fromMultiplierToDecimalProportion(row.utilidad),
//     toDecimalProportion(row.flete),
//   );
//   const precioTarjeta = ProductCalculator.cardPrice(
//     precio,
//     toDecimalProportion(row.tarjeta),
//   );
//   return {
//     id,
//     codigo: row.codigo,
//     descripcion: row.descripcion,
//     precio,
//     precioTarjeta,
//   };
// };

export const minMaxFormatter = (value: number, min: number, max: number): number => {
  if (value > max) {
    return max;
  }
  if (value < min) {
    return min;
  }
  return value;
};

export class ProductCalculator {
  static cost(listPrice: number, vat: number, discounts: number[] = []): number {
    const totalDiscount: number = discounts.reduce((acc, discount) => acc + discount, 0);
    const cost = (listPrice * (1 + vat - totalDiscount)).toFixed(2);
    return parseFloat(cost);
  }

  static price(cost: number, utility: number, transport: number): number {
    return parseFloat((cost * (1 + utility + transport)).toFixed(2));
  }

  static cardPrice(price: number, card: number): number {
    return parseFloat((price * (1 + card)).toFixed(2));
  }

  /**
   * Calculates the return amount for a ticket line based on the global discount,
   * the payment method and the purchased quantity
   */
  static returnAmount(ticket: ITicket, line: ITicketLine) {
    const priceUnit = [PayMethod.CASH, PayMethod.TRANSFER].includes(ticket.pay_method as PayMethod)
      ? line.product.precio
      : line.product.precioTarjeta;
    return line.quantity * priceUnit * (1 - ticket.discount / 100);
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

export async function hashPassword(password: string, saltBase64: string) {
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  const salt = Buffer.from(saltBase64, 'base64');
  const keyMaterial = await window.crypto.subtle.importKey('raw', passwordData, { name: 'PBKDF2' }, false, [
    'deriveBits',
    'deriveKey',
  ]);
  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
  const keyData = await window.crypto.subtle.exportKey('raw', key);
  return Array.from(new Uint8Array(keyData))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateSalt() {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode.apply(null, Array.from(salt)));
}

export const toTicket = (historyItem: IHistoryItem): ITicket => {
  return {
    id: historyItem.id,
    ticket_number: historyItem.id,
    pay_method: historyItem.payMethod,
    created_at: new Date(historyItem.date).toISOString(),
    discount: historyItem.discount,
    subtotal: historyItem.subTotal,
    total: historyItem.total,
    lines: historyItem.ticketLines,
    state: historyItem.state,
    return_ticket_id: historyItem.returnTicket?.ticket?.id,
    return_products: historyItem.returnTicket?.returnProducts,
    return_total_amount: historyItem.returnTicket?.totalCredit,
  };
};

export const toHistoryItem = (ticket: ITicket): IHistoryItem => {
  return {
    id: ticket.ticket_number,
    date: new Date(ticket.created_at).getTime(),
    payMethod: ticket.pay_method as PayMethod,
    total: ticket.total,
    ticketLines: ticket.lines,
    discount: ticket.discount,
    subTotal: ticket.subtotal,
    state: ticket.state,
    returnTicket: ticket.return_ticket_id
      ? {
          ticket: {
            id: ticket.return_ticket_id,
          },
          returnProducts: ticket.return_products!,
          totalCredit: ticket.return_total_amount!,
        }
      : undefined,
  };
};

const toLocaleNumber = (num: number) => num.toFixed(2).replace(',', '').replace('.', ',');

const toPercentage = (num: number) => `${toLocaleNumber(num)}%`;

export function downloadHistoryCSV(history: IHistoryItem[]): void {
  const exportable = history.map((r) => {
    return {
      'Ticket Nro': r.id,
      Fecha: new Date(r.date).toLocaleDateString('es-AR'),
      Hora: new Date(r.date).toLocaleTimeString('es-AR'),
      'Metodo de Pago': r.payMethod,
      Subtotal: toLocaleNumber(r.subTotal),
      Descuento: toPercentage(r.discount),
      Total: toLocaleNumber(r.total),
    };
  });
  downloadCSV(exportable);
}

export function downloadHistoryWithDetailCSV(history: IHistoryItem[]): void {
  const exportable = history.flatMap((r) => {
    return r.ticketLines.map((line) => {
      return {
        'Ticket Nro': r.id,
        Fecha: new Date(r.date).toLocaleDateString('es-AR'),
        Hora: new Date(r.date).toLocaleTimeString('es-AR'),
        'Metodo de Pago': r.payMethod,
        'Ticket Subtotal': toLocaleNumber(r.subTotal),
        Descuento: toPercentage(r.discount),
        'Ticket Total': toLocaleNumber(r.total),
        Codigo: line.product.codigo,
        Descripcion: line.product.descripcion,
        'Precio Unitario': toLocaleNumber(line.product.precio),
        'Precio Tarjeta': toLocaleNumber(line.product.precioTarjeta),
        Cantidad: line.quantity,
        'Subtotal Linea': toLocaleNumber(line.product.precio * line.quantity),
      };
    });
  });
  downloadCSV(exportable);
}

/**
 * Export data to a CSV file
 *
 * NOTE: take from [react-data-table-component docs](https://react-data-table-component.netlify.app/?path=/story/examples-export-csv--export-csv)
 * @param cols The columns to be exported
 * @param array The data to be exported
 */
export function downloadCSV(array: any[]): void {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = 'history.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
}

/**
 * Convert an array of objects to a CSV string
 */
function convertArrayOfObjectsToCSV(array: any[]): string {
  let result: string;
  const cols = Object.keys(array[0]);
  const columnDelimiter = ';';
  const lineDelimiter = '\n';

  result = '';
  result += cols.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    cols.forEach((col) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[col];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
type AnyFunc = (...args: any[]) => any;

export const debounce = <TFunc extends AnyFunc>(func: TFunc, wait: number): TFunc => {
  let timeout: NodeJS.Timeout;
  return ((...args: Parameters<TFunc>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as TFunc;
};
/**
 * Formats a number as money
 */
export const money = (amount: number, decimals: number = DECIMALS): string =>
  `$ ${amount.toLocaleString('es-AR', { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}`;
