import { useEffect, useState } from "react";

interface TodoItemProps {
  title: string;
  content?: string;
  parentIsOpen: boolean;
}

function TodoItem({ title, content, parentIsOpen }: TodoItemProps) {
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
    <div className="py-2 shadow shadow-blue-500">
      <div>
        <span>{title} </span>
        <button
          className="m-2 bg-blue-400 px-2 py-1 text-base text-white opacity-90 shadow-md shadow-blue-500 transition-all duration-150 hover:shadow-lg hover:shadow-blue-500 active:bg-blue-500 active:shadow-lg active:shadow-blue-600"
          onClick={toggleContent}
        >
          Open
        </button>
        <div
          className={`${
            isOpen ? "my-2 max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          } mx-2 overflow-hidden transition-all duration-300 ease-in-out md:mx-10`}
        >
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
