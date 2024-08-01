import { useCallback, useEffect, useState } from 'react';
import { useWebWorker } from './useWebWorker';

export const useHash = (file?: Blob) => {
  const [hash, setHash] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [progress, setProgress] = useState<number | null>(null);

  const { response, callWorker, terminateWorker } = useWebWorker();

  const resetState = useCallback(() => {
    setHash(undefined);
    setError(undefined);
    setProgress(null);
    terminateWorker();
  }, [terminateWorker]);

  useEffect(() => {
    if (file) {
      resetState();
    }
  }, [file, resetState]);

  const readFile = useCallback(() => {
    resetState();
    callWorker(file);
  }, [callWorker, file, resetState]);

  useEffect(() => {
    if (response) {
      if (response.error) {
        setError(response.error);
      }

      if (response.result) {
        setHash(response.result);
      }

      if (response.progress) {
        setProgress(response.progress);
      }
    }
  }, [response]);

  return {
    readFile,
    hash,
    error,
    progress,
  };
};
