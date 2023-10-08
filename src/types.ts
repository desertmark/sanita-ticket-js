export interface IProduct {
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
}

export interface ITicketLine {
  product: IProduct;
  quantity: number;
}
