import { useState } from "react";

interface TodoItemProps {
  title: string;
  content: string;
}

function TodoItem({ title, content }: TodoItemProps) {
  const [isOpen, setisOpen] = useState(false);

  function toggleContent() {
    setisOpen(!isOpen);
  }

  return (
    <div className="py-2 shadow shadow-blue-500">
      <div>
        <span>{title} </span>
        <button
          className="m-2 bg-blue-400 p-2 opacity-90 shadow-md shadow-blue-500 transition-all duration-150 hover:shadow-lg hover:shadow-blue-500 active:shadow-lg active:shadow-blue-600"
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
