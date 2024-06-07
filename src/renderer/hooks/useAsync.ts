import { useCallback, useEffect, useState } from 'react';

export const useAsync = <T>(cb: () => Promise<T>, defaultValue?: T) => {
  const [data, setData] = useState<T | undefined>(defaultValue);
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    setData(defaultValue);
    try {
      setData(await cb());
    } catch (err: Error | any) {
      setError(err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    data,
    error,
    loading,
    refresh,
  };
};
