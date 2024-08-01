import { ReactNode, useCallback, useState } from 'react';

const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: ReactNode;
}) => {
  const [show, setShow] = useState(false);

  const handleClickButton = useCallback(() => {
    setShow(true);
    setTimeout(() => setShow(false), 1000);
  }, []);

  return (
    <div
      className="group relative flex max-w-max flex-col items-center justify-center"
      onClick={handleClickButton}
    >
      {children}
      <div
        className={`absolute bottom-6 ml-auto mr-auto min-w-max -translate-x-1/2 rounded-lg px-3 py-2 text-xs font-medium scale-0 ${show && 'animate-showShort'}`}
      >
        <div className="flex max-w-xs flex-col items-center shadow-lg">
          <div className="rounded bg-gray-800 p-2 text-center text-xs text-white">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
