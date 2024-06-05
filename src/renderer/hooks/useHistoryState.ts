import { IHistoryItem } from '../../types';
import { useHistoryManager } from './useHistoryManager';

export interface IHistoryState {
  rows: IHistoryItem[];
}

export const useHistoryState = (): IHistoryState => {
  const manager = useHistoryManager();

  return {
    rows: manager.list(),
  };
};
