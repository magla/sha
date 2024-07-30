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
    navigator.clipboard.writeText(hash);
  }, [hash]);

  return (
    <>
      <div className="flex gap-2 items-center justify-between w-full">
        <div className="text-green-700 text-sm text-bold">{hash}</div>
        <CopyButton onClick={handleCopyClick} />
      </div>
      <div
        id="file-details"
        className="flex flex-col align-middle justify-start w-full"
      >
        {name && <div className="">Name: {name}</div>}
        {size && <div className="">Size: {fileSize} MB</div>}
        {description && <div className="">Description: {description}</div>}
      </div>
    </>
  );
};

export default FileDetails;
