export interface IProduct {
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
  precioTarjeta: number;
}

export interface ITicketLine {
  product: IProduct;
  quantity: number;
}
