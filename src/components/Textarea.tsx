import { useCallback } from 'react';
import { sanitizeInput } from '../helpers/file';

// const maxChars = 500;

const Textarea = ({
  onChange,
  placeholder,
  id,
}: {
  onChange: (value: string) => void;
  placeholder?: string;
  id: string;
}) => {
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
      maxLength={500}
      data-testid={id}
      rows={4}
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
      placeholder={placeholder}
      onChange={handleChange}
    ></textarea>
  );
};

export default Textarea;
