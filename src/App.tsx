import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { useHash } from './hooks/useHash';
import { ErrorMessages } from './const';
import { sanitizeFilename } from './helpers/file';
import {
  Dropzone,
  FileDetails,
  ProgressBar,
  SubmitButton,
  Textarea,
} from './components';

function App() {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<Blob | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const [fileSize, setFileSize] = useState<number | undefined>();
  const [isPending, setIsPending] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { readFile, hash, error, progress } = useHash(file);

  const handleFileChange = useCallback((file: File, sanitizedName: string) => {
    setFile(file);
    setFileName(sanitizeFilename(sanitizedName));
    setFileSize(file.size);
    setIsPending(false);

    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setIsPending(true);
      readFile();
    },
    [readFile]
  );

  useEffect(() => {
    if (progress === 100 || error) {
      setIsPending(false);
    }
  }, [progress, error]);

  return (
    <form onSubmit={handleSubmit} role="form">
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <Dropzone id="file" onChange={handleFileChange} disabled={false} />
        {error && (
          <div className="w-full p-1 text-white bg-blue-700">{error}</div>
        )}
        {!isPending && !hash ? (
          <SubmitButton
            disabled={error === ErrorMessages.fileTooBig}
            text={error ? 'Retry' : 'Get SHA256'}
          />
        ) : (
          <ProgressBar value={progress} isDone={!isPending} />
        )}
        <Textarea
          disabled={!!hash}
          ref={textareaRef}
          id="description-textarea"
          placeholder="Write file description here"
          onChange={setDescription}
        />
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
