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
  return {
    id,
    codigo: row.codigo,
    descripcion: row.descripcion,
    precio: row.precio,
  };
};
