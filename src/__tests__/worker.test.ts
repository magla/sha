import { waitFor } from '@testing-library/dom';
import * as MessageHelper from '../helpers/message';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('../const.ts', () => ({
  ...jest.requireActual('../const.ts'),
  maxFileSize: 1024 * 1024 * 10,
}));
jest.spyOn(MessageHelper, 'handleOnMessage');

class MockWorker {
  postMessageMock = jest.fn();

  onmessage: ((this: Worker, ev: MessageEvent<unknown>) => never) | null = null;
  onerror: ((this: AbstractWorker, ev: ErrorEvent) => never) | null = null;
  postMessage(message: unknown) {
    this.postMessageMock(message);
  }

  terminate() {}
  onmessageerror() {}
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {
    return false;
  }
}

const worker = new MockWorker();

describe('Hash Worker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process a file and return the hash', async () => {
    const testFile = new File(['test content'], 'test.txt', {
      type: 'text/plain',
    });
    MessageHelper.handleOnMessage(testFile, worker);

    await waitFor(() => {
      expect(worker.postMessageMock).toHaveBeenCalledWith(
        JSON.stringify({
          event: 'progress',
          progress: 0,
        })
      );
      expect(worker.postMessageMock).toHaveBeenCalledWith(
        JSON.stringify({
          event: 'result',
          result:
            '6ae8a75555209fd6c44157c0aed8016e763ff435a19cf186f76863140143ff72',
        })
      );
    });
  });

  it('should return an error if the file is too large', async () => {
    const largeFile = new File(
      [new ArrayBuffer(1024 * 1024 * 11)],
      'large.txt',
      { type: 'text/plain' }
    );

    MessageHelper.handleOnMessage(largeFile, worker);

    await waitFor(() =>
      expect(worker.postMessageMock).toHaveBeenCalledWith(
        JSON.stringify({
          event: 'error',
          error: 'File is too large',
        })
      )
    );
  });

  it('should return an error if no file is provided', async () => {
    MessageHelper.handleOnMessage(null, worker);

    await waitFor(() =>
      expect(worker.postMessageMock).toHaveBeenCalledWith(
        JSON.stringify({
          event: 'error',
          error: 'No file provided',
        })
      )
    );
  });
});
