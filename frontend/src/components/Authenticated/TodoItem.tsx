import { useEffect, useState } from "react";

interface TodoItemProps {
  title: string;
  content?: string;
  parentIsOpen: boolean;
  onDelete: (title: string) => void;
}

function TodoItem({ title, content, parentIsOpen, onDelete }: TodoItemProps) {
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    if (!parentIsOpen) {
      setisOpen(false);
    }
  }, [parentIsOpen]);

  function toggleContent() {
    setisOpen(!isOpen);
  }

  return (
    <div className="pt-2 font-light shadow shadow-blue-500">
      <div className="mx-2 grid grid-cols-3 gap-4 md:mx-20">
        <span className="mt-2">{title} </span>
        <button
          className="m-2 bg-blue-400 px-2 py-1 text-base text-white opacity-90 shadow-md shadow-blue-500 transition-all duration-150 hover:shadow-lg hover:shadow-blue-500 active:bg-blue-500 active:shadow-lg active:shadow-blue-600"
          onClick={toggleContent}
        >
          Open
        </button>
        <button
          className="m-2 bg-red-500 px-1 py-1 text-base text-white opacity-90 shadow-md shadow-red-500 transition-all duration-150 hover:shadow-lg hover:shadow-red-600 active:bg-red-600 active:shadow-lg active:shadow-red-700"
          onClick={() => onDelete(title)}
        >
          Delete
        </button>
        <div
          className={`${
            isOpen ? "my-2 max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          } col-span-full overflow-hidden transition-all duration-300 ease-in-out `}
        >
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
