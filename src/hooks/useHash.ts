import { useCallback, useEffect, useState } from 'react';
import { blobToHash, toMBString } from '../helpers/file';
import { ErrorMessages } from '../const';

const maxFileSize = 10000;

export const useHash = (file?: Blob) => {
  const [progress, setProgress] = useState(0);
  const [hash, setHash] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined | null>();

  useEffect(() => {
    setHash(undefined);
    setError(undefined);
    setProgress(0);

    if (!file) {
      return;
    }

    const fileSize = toMBString(file.size); // MB

    if (fileSize > maxFileSize) {
      setError(ErrorMessages.fileTooBig);
    }
  }, [file]);

  const handleLoadStart = useCallback(
    async (_event: ProgressEvent<FileReader>) => {
      setProgress(0);
    },
    []
  );

  const handleError = useCallback(async (event: ProgressEvent<FileReader>) => {
    setError(event.target?.error?.message);
    setProgress(0);
  }, []);

  const handleProgress = useCallback(
    async (event: ProgressEvent<FileReader>) => {
      setProgress((event.loaded / event.total) * 100);
    },
    []
  );

  const handleLoadEnd = useCallback(
    async (entry: ProgressEvent<FileReader>) => {
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

  const readFile = useCallback(() => {
    const fileReader = new FileReader();

    if (!file) {
      return;
    }

    fileReader.readAsArrayBuffer(file);
    fileReader.onloadstart = handleLoadStart;
    fileReader.onerror = handleError;
    fileReader.onprogress = handleProgress;
    fileReader.onloadend = handleLoadEnd;
  }, [handleError, handleProgress, handleLoadEnd, file]);

  return {
    readFile,
    hash,
    error,
    progress,
  };
};
