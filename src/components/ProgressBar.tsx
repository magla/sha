const ProgressBar = ({ value = 0 }: { value?: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded h-8">
      <div
        className="flex items-center justify-center text-gray-200 bg-gray-600 h-8 rounded transition-all"
        style={{ width: `${value}%` }}
      >
        {value === 100 && 'Done!'}
      </div>
    </div>
  );
};

export default ProgressBar;
