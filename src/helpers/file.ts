import DOMPurify from 'dompurify';
import sanitize from 'sanitize-filename';

export function blobToHash(buffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2))
    .join('');
}

export function toMBString(value?: number) {
  if (!value) {
    return 0;
  }

  return parseFloat((value / 1024 / 1024).toFixed(4));
}

export function sanitizeInput(input: string) {
  return DOMPurify.sanitize(input);
}

export function sanitizeFilename(filename: string) {
  return sanitize(filename);
}
