import { useCallback } from 'react';
import CopyButton from './CopyButton';
import { toMBString } from '../helpers/file';

const FileDetails = ({
  hash,
  name,
  size,
  description,
}: {
  hash: string;
  name?: string;
  size?: number;
  description?: string;
}) => {
  const fileSize = toMBString(size);

  const handleCopyClick = useCallback(() => {
    void navigator.clipboard.writeText(hash);
  }, [hash]);

  return (
    <>
      <div className="flex items-center justify-between w-full gap-2">
        <div className="text-sm text-green-700 text-bold" data-testid="hash">
          {hash}
        </div>
        <CopyButton onClick={handleCopyClick} />
      </div>
      <div
        id="file-details"
        className="flex flex-col justify-start w-full align-middle"
      >
        {name && (
          <div className="">
            Name: <span data-testid="filename">{name}</span>
          </div>
        )}
        {size && (
          <div className="">
            Size: <span>{fileSize} MB</span>
          </div>
        )}
        {description && (
          <div className="">
            Description: <span data-testid="description">{description}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default FileDetails;
