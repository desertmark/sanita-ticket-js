export interface ITablePagination {
  page: number;
  size?: number;
}
export interface IFindResult<T> {
  items: T[];
  count: number;
}
