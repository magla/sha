import DOMPurify from 'dompurify';
import sanitize from 'sanitize-filename';

export function toMBString(value?: number) {
  if (!value) {
    return 0;
  }

  return parseFloat((value / 1024 / 1024).toFixed(4));
}

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input);
}

export function sanitizeFilename(filename: string): string {
  return sanitize(filename);
}
