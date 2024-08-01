import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
Object.defineProperty(globalThis, 'crypto', {
  value: {
    subtle: {
      digest: async (algorithm: string, _data: any) => {
        if (algorithm === 'SHA-256') {
          return new TextEncoder().encode('test');
        }
        throw new Error('Unsupported algorithm');
      },
    },
  },
});
