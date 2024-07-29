const SubmitButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center w-full justify-center"
    >
      <span>{text}</span>
    </button>
  );
};

export default SubmitButton;
