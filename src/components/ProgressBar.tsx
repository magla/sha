const ProgressBar = ({
  value = 0,
  isDone = false,
}: {
  value?: number | null;
  isDone?: boolean;
}) => {
  return (
    <div className="w-full h-8 bg-gray-200 rounded">
      <div
        className="flex items-center justify-center h-8 text-gray-200 transition-all bg-gray-600 rounded"
        style={{ width: value !== null ? `${value}%` : 0 }}
      >
        {isDone && 'Done!'}
      </div>
    </div>
  );
};

export default ProgressBar;
