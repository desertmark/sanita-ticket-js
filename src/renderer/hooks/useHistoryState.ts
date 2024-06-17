import { IHistoryItem } from '../../types';
// import { useHistoryManager } from './useHistoryManager';
import { useTicketsApi } from './useSupabase';

export interface IHistoryState {
  rows: IHistoryItem[];
}

export const useHistoryState = (): IHistoryState => {
  // const manager = useHistoryManager();
  const { tickets } = useTicketsApi();
  return {
    rows: tickets || [],
  };
};
