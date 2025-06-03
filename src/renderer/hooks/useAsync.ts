/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

export const useAsync = <Data, Args = unknown, Default = undefined>(
  cb: (arg: Args) => Promise<Data>,
  arg: Args = undefined as Args,
  defaultValue: Default = undefined as Default,
) => {
  const [data, setData] = useState<Data | Default>(defaultValue);
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
