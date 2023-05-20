import { useEffect, useState } from "react";

interface TodoItemProps {
  id: number | null;
  title: string;
  content?: string;
  parentIsOpen: boolean;
  completed: boolean;
  listId: number;
  itemId?: number;
  onDelete: (itemId: number) => void;
}

function TodoItem({
  title,
  content,
  parentIsOpen,
  onDelete,
  id,
}: TodoItemProps) {
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
      <div className="grid-rows-auto mx-2 grid grid-cols-2 items-center gap-4 md:mx-5">
        <h3 className="col-span-2 mt-2 flex flex-grow flex-wrap justify-center break-words">
          {title}
        </h3>
        <div className="col-span-full row-start-2 flex items-center justify-center space-x-2">
          <button
            className="bg-blue-400 px-2 py-1 text-base text-white opacity-90 shadow-md shadow-blue-500 transition-all duration-150 hover:shadow-lg hover:shadow-blue-500 active:bg-blue-500 active:shadow-lg active:shadow-blue-600"
            onClick={toggleContent}
          >
            {isOpen ? "Close" : "Open"}
          </button>
          <button
            className="bg-red-500 px-1 py-1 text-base text-white opacity-90 shadow-md shadow-red-500 transition-all duration-150 hover:shadow-lg hover:shadow-red-600 active:bg-red-600 active:shadow-lg active:shadow-red-700"
            onClick={() => onDelete(id ? id : 0)}
          >
            Delete
          </button>
        </div>
        <div
          className={`${
            isOpen ? "my-2 max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          } col-span-full overflow-hidden transition-all duration-300 ease-in-out `}
        >
          <div className="break-words">{content}</div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
