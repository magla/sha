const SubmitButton = ({
  text,
  disabled,
  onClick,
}: {
  text: string;
  disabled: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center w-full justify-center disabled:pointer-events-none disabled:text-gray-300"
    >
      <span>{text}</span>
    </button>
  );
};

export default SubmitButton;
