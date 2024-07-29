const ProgressBar = ({ value = 0 }: { value?: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded h-8">
      <div className="bg-gray-600 h-8 rounded" style={{ width: value }}></div>
    </div>
  );
};

export default ProgressBar;
