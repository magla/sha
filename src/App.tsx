import { useCallback, useEffect, useState } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar';
import SubmitButton from './components/SubmitButton';
import FileDetails from './components/FileDetails';
import Dropzone from './components/Dropzone';
import Textarea from './components/Textarea';
import { useHash } from './hooks/useHash';

function App() {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<Blob | undefined>();
  const [fileName, setFileName] = useState();
  const [fileSize, setFileSize] = useState();

  const { readFile, hash, error, progress } = useHash();

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<any>) => {
      const inputElement = event.currentTarget;
      const newFile = inputElement.files[0];

      setFile(newFile);
      setFileName(newFile.name);
      setFileSize(newFile.size);
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      if (!file) {
        return;
      }

      try {
        readFile(file);
        // show a success toast notification
        // showToast('Message sent successfully', 'success');
        debugger;
      } catch (error) {
        // show an error toast notification
        // showToast('Message sending failed', 'error');
        return error;
      }
    },
    [file]
  );

  useEffect(() => {
    // error && showToast(error);
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center w-full gap-4 flex-col">
        <Dropzone id="file" onChange={handleFileChange} />
        {error && <div className="text-blue-700">{error}</div>}
        {progress === 0 ? (
          <SubmitButton text={error ? 'Retry' : 'Get SHA256'} />
        ) : (
          <ProgressBar value={progress} />
        )}
        <Textarea
          placeholder="Write file description here"
          onChange={(e) => setDescription(e.currentTarget.value)}
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
