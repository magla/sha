import CopyButton from './CopyButton';

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
  return (
    <>
      <div className="flex gap-4 items-center justify-between w-full">
        <div className="text-green-700 text-3xl">{hash}</div>
        <CopyButton />
      </div>
      <div id="file-details" className="flex justify-start w-full">
        {name && <div className="">Name: {name}</div>}
        {size && <div className="">Size: {size}</div>}
        {description && <div className="">Description: {description}</div>}
      </div>
    </>
  );
};

export default FileDetails;
