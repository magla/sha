import jsSHA from 'jssha';
import { chunkSize, maxFileSize } from '../const';

const readNext = (data: File, bytesRead: number, fileReader: FileReader) => {
  const slice = data.slice(bytesRead, bytesRead + chunkSize);
  fileReader.readAsArrayBuffer(slice);
};

export const handleOnMessage = (data: unknown, worker: Worker) => {
  if (!data) {
    worker.postMessage(
      JSON.stringify({ event: 'error', error: 'No file provided' })
    );
    return;
  }

  if (!(data instanceof File)) {
    worker.postMessage(
      JSON.stringify({ event: 'error', error: 'Expecting a file' })
    );
    return;
  }

  if (data.size > maxFileSize) {
    worker.postMessage(
      JSON.stringify({ event: 'error', error: 'File is too large' })
    );
    return;
  }

  const fileReader = new FileReader();
  const sha = new jsSHA('SHA-256', 'ARRAYBUFFER');

  let bytesRead = 0;

  readNext(data, bytesRead, fileReader);

  fileReader.onloadend = () => {
    if (fileReader.result) {
      sha.update(fileReader.result);
    }

    if (bytesRead < data.size) {
      readNext(data, bytesRead, fileReader);
    } else {
      worker.postMessage(
        JSON.stringify({ event: 'result', result: sha.getHash('HEX') })
      );
    }
  };

  fileReader.onerror = (event) => {
    worker.postMessage(
      JSON.stringify({
        event: 'error',
        error: event.target?.error?.message || 'Unknown error',
      })
    );
  };

  fileReader.onprogress = (event) => {
    worker.postMessage(
      JSON.stringify({
        event: 'progress',
        progress: Math.trunc((bytesRead / data.size) * 100),
      })
    );

    bytesRead += event.loaded;
  };
};
