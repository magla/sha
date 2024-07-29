import { useCallback, useState } from 'react';
import { blobToHash } from '../helpers/file';

export const useHash = () => {
  const [progress, setProgress] = useState(0);
  const [hash, setHash] = useState<string | undefined>();
  const [error, setError] = useState<DOMException | undefined | null>();

  const handleError = useCallback(async (event: ProgressEvent<FileReader>) => {
    debugger;
    setError(event.target?.error);
  }, []);

  const handleProgress = useCallback(
    async (event: ProgressEvent<FileReader>) => {
      debugger;
      setProgress(event.loaded);
    },
    []
  );

  const handleLoadEnd = useCallback(
    async (entry: ProgressEvent<FileReader>) => {
      debugger;
      if (!entry.target?.result) {
        return;
      }

      if (typeof entry.target?.result === 'string') {
        return;
      }

      setHash(
        blobToHash(await crypto.subtle.digest('SHA-256', entry.target.result))
      );
    },
    [blobToHash]
  );

  const readFile = useCallback(
    (file: Blob) => {
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);
      fileReader.onerror = handleError;
      fileReader.onprogress = handleProgress;
      fileReader.onloadend = handleLoadEnd;
    },
    [handleError, handleProgress, handleLoadEnd]
  );

  return {
    readFile,
    hash,
    error,
    progress,
  };
};
