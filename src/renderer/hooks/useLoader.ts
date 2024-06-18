/* eslint-disable promise/catch-or-return */
import { useState } from 'react';

export interface ILoader {
  isLoading: boolean;
  waitFor: <T>(task: Promise<T>) => Promise<T>;
}

export const useLoader = (): ILoader => {
  const [tasks, setTasks] = useState<Promise<any>[]>([]);

  const waitFor = async (task: Promise<any>) => {
    setTasks([...tasks, task]);
    return task.finally(() => {
      setTasks(tasks.filter((t) => t !== task));
    });
  };

  return {
    isLoading: tasks.length > 0,
    waitFor,
  };
};