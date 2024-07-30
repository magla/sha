import { useCallback, useMemo, useState, useTransition } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar';
import SubmitButton from './components/SubmitButton';
import FileDetails from './components/FileDetails';
import Dropzone from './components/Dropzone';
import Textarea from './components/Textarea';
import { useHash } from './hooks/useHash';
import { ErrorMessages } from './const';
import { sanitizeFilename } from './helpers/file';

function App() {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<Blob | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const [fileSize, setFileSize] = useState<number | undefined>();
  const [_, startTransition] = useTransition();

  const { readFile, hash, error, progress } = useHash(file);

  const handleFileChange = useCallback(
    async (file: File, sanitizedName: string) => {
      setFile(file);
      setFileName(sanitizeFilename(sanitizedName));
      setFileSize(file.size);
      setDescription('');
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      startTransition(() => {
        readFile();
      });
    },
    [file]
  );

  const done = useMemo(() => {
    return progress === 100;
  }, [progress]);

  return (
    <form onSubmit={handleSubmit} role="form">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <Dropzone id="file" onChange={handleFileChange} />
        {error && (
          <div className="w-full p-1 text-white bg-blue-700">{error}</div>
        )}
        {progress === 0 ? (
          <SubmitButton
            disabled={error === ErrorMessages.fileTooBig}
            text={
              error && error !== ErrorMessages.fileTooBig
                ? 'Retry'
                : 'Get SHA256'
            }
          />
        ) : (
          <ProgressBar value={progress} />
        )}
        {!done && (
          <Textarea
            id="description-textarea"
            placeholder="Write file description here"
            onChange={setDescription}
          />
        )}
        {hash && (
          <FileDetails
            hash={hash}
            name={fileName}
            size={fileSize}
            description={description}
          />
        )}
      </div>
    </form>
  );
}

export default App;
