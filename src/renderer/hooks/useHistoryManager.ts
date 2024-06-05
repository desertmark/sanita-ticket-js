import { IHistoryItem } from '../../types';
import { useStorage } from './useStorage';

export interface IHistoryManager {
  list: () => IHistoryItem[];
  findById: (id: number) => IHistoryItem | undefined;
  save: (item: IHistoryItem) => void;
  remove: (id: number) => void;
}

export const useHistoryManager = (): IHistoryManager => {
  const { set: setRows, value: rows } = useStorage<IHistoryItem[]>(
    'history',
    [],
  );
  const findById = (id: number) => rows.find((item) => item.id === id);
  const save = (item: IHistoryItem) => {
    if (findById(item.id)) {
      throw Error('Ticket already exists');
    }
    setRows([...rows, item]);
  };
  const list = () => rows;

  const remove = (id: number) => {
    setRows(rows.filter((item) => item.id !== id));
  };
  return {
    findById,
    list,
    save,
    remove,
  };
};
