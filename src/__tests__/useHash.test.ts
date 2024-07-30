import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { useHash } from '../hooks/useHash';

describe('useHash hook', () => {
  test('calculates SHA256 hash for a file', async () => {
    const file = new Blob(['test'], { type: 'text/plain' });
    const { result } = renderHook(() => useHash(file));

    act(() => {
      result.current.readFile();
    });

    await waitFor(() => expect(result.current.progress).toBe(100));
    await waitFor(() => expect(result.current.hash).toBe('74657374'));
  });

  test('handles file size limit', async () => {
    const largeFile = new Blob(['x'.repeat(1024 * 1024 * 51)], {
      type: 'text/plain',
    }); // 51MB file
    const { result } = renderHook(() => useHash(largeFile));

    act(() => {
      result.current.readFile();
    });

    await waitFor(() =>
      expect(result.current.error).toBe('File size exceeds limit of 10GB')
    );
  });

  test('handles file with invalid content', async () => {
    const invalidBlob = new Blob(['invalid data'], { type: 'invalid/type' });

    const { result } = renderHook(() => useHash(invalidBlob));

    act(() => {
      result.current.readFile();
    });

    await waitFor(() => expect(result.current.error).toBeDefined());
  });
});
