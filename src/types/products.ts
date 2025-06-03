/* eslint-disable import/no-cycle */
import { ITicketLine } from './tickets';

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
