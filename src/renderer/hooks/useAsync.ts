import { useCallback, useEffect, useState } from 'react';

export const useAsync = <T, P = unknown>(
  cb: (arg: P) => Promise<T>,
  arg?: P,
  defaultValue?: T,
) => {
  const [data, setData] = useState<T | undefined>(defaultValue);
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = useCallback(async (refreshArg = arg) => {
    setLoading(true);
    setError(undefined);
    setData(defaultValue);
    try {
      setData(await cb(refreshArg!));
    } catch (err: Error | any) {
      setError(err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refresh(arg);
  }, [refresh]);

  return {
    data,
    error,
    loading,
    refresh,
  };
};
