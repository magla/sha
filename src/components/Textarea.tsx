import { forwardRef, useCallback } from 'react';
import { sanitizeInput } from '../helpers/file';

const maxChars = 500;

const Textarea = forwardRef<
  HTMLTextAreaElement,
  {
    disabled: boolean;
    onChange: (value: string) => void;
    placeholder?: string;
    id: string;
  }
>(({ onChange, placeholder, id, disabled }, ref) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value, maxLength } = event.target;
      const message = value.slice(0, maxLength);
      const sanitizedValue = sanitizeInput(message);

      onChange && onChange(sanitizedValue);
    },
    [onChange]
  );

  return (
    <textarea
      disabled={disabled}
      ref={ref}
      maxLength={maxChars}
      data-testid={id}
      rows={4}
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
      placeholder={placeholder}
      onChange={handleChange}
    ></textarea>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
