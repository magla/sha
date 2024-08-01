import { handleOnMessage } from '../helpers/message';

self.onmessage = ({ data }) => {
  try {
    handleOnMessage(data, self as unknown as Worker);
  } catch (error: unknown) {
    self.postMessage(
      JSON.stringify({ event: 'error', error: (error as Error).message })
    );
  }
};
