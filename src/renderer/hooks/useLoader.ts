/* eslint-disable promise/catch-or-return */
import { useState } from 'react';

export interface ILoader {
  isLoading: boolean;
  waitFor: (task: Promise<any>) => void;
}

export const useLoader = (): ILoader => {
  const [tasks, setTasks] = useState<Promise<any>[]>([]);

  const waitFor = (task: Promise<any>) => {
    setTasks([...tasks, task]);
    task.finally(() => {
      setTasks(tasks.filter((t) => t !== task));
    });
  };

  return {
    isLoading: tasks.length > 0,
    waitFor,
  };
};
