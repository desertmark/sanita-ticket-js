/* eslint-disable promise/catch-or-return */
import { useCallback, useMemo, useState } from 'react';

export interface ILoader {
  isLoading: boolean;
  waitFor: <T>(task: Promise<T>) => Promise<T>;
}

export const useLoader = (): ILoader => {
  const [tasks, setTasks] = useState<Promise<any>[]>([]);

  const waitFor = useCallback(
    async (task: Promise<any>) => {
      setTasks([...tasks, task]);
      return task.finally(() => {
        setTasks(tasks.filter((t) => t !== task));
      });
    },
    [tasks],
  );

  return useMemo(
    () => ({
      isLoading: tasks.length > 0,
      waitFor,
    }),
    [tasks.length, waitFor],
  );
};
