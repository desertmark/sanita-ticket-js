/* eslint-disable promise/catch-or-return */
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface ILoader {
  isLoading: boolean;
  waitFor: <T>(task: Promise<T>) => Promise<T>;
}

export const useLoader = (): ILoader => {
  const [tasks, setTasks] = useState<Map<string, Promise<any>>>(new Map());

  const waitFor = useCallback(async (task: Promise<any>) => {
    const taskId = uuidv4();
    setTasks((currentTasks) => new Map(currentTasks).set(taskId, task));
    return task.finally(() => {
      setTasks((currentTasks) => {
        const newTasks = new Map(currentTasks);
        newTasks.delete(taskId);
        return newTasks;
      });
    });
  }, []);

  return { isLoading: tasks.size > 0, waitFor };
};
