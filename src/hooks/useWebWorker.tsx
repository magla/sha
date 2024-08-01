/// <reference types="vite/client" />
import { useEffect, useRef, useState, useCallback } from 'react';
import MyWorker from '../workers/worker.ts?worker';

type WorkerResponse = {
  event?: string;
  result?: string;
  error?: string | null;
  progress?: number | null;
};

export const useWebWorker = () => {
  const workerRef = useRef<Worker | null>(null);

  const [response, setResponse] = useState<WorkerResponse | null>(null);

  const startWorker = useCallback(() => {
    workerRef.current = new MyWorker();

    workerRef.current.onmessage = (messageEvent: MessageEvent<string>) => {
      const { event, error, progress, result } = JSON.parse(
        messageEvent.data
      ) as WorkerResponse;

      switch (event) {
        case 'error':
          setResponse({ error, progress: null });
          break;
        case 'progress':
          setResponse({ progress });
          break;
        case 'result':
          setResponse({ result, error: null, progress: 100 });
      }
    };
  }, []);

  useEffect(() => {
    startWorker();

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [startWorker]);

  const callWorker = useCallback((file?: Blob) => {
    if (workerRef.current) {
      setResponse(null);

      workerRef.current.postMessage(file);
    }
  }, []);

  const terminateWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      startWorker();
    }
  }, [startWorker]);

  return { response, callWorker, terminateWorker };
};
