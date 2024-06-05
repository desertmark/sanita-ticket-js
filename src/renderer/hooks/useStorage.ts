import { useState } from 'react';

export interface Storage<T> {
  value: T;
  set: (value: T) => void;
  remove: () => void;
}

export const useStorage = <T>(key: string, defaultValue: T): Storage<T> => {
  const get = (): T => {
    try {
      const value = localStorage.getItem(key);
      const parsed = JSON.parse(value!);
      return parsed || defaultValue;
    } catch {
      return defaultValue;
    }
  };
  const set = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  const [value, setValue] = useState<T>(get());

  return {
    value,
    set,
    remove: () => {
      localStorage.removeItem(key);
      setValue(defaultValue);
    },
  };
};
