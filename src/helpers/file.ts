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
