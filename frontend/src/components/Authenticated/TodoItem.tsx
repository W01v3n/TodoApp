import { useState } from "react";

interface TodoItemProps {
  title: string;
  content: string;
}

function TodoItem({ title, content }: TodoItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleContent() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="shadow-md shadow-blue-300">
      <div>
        <span>{title} </span>
        <button
          className="m-2 bg-blue-400 p-2 opacity-90 shadow-md shadow-blue-500 transition-all duration-150 hover:shadow-lg hover:shadow-blue-500 active:shadow-lg active:shadow-blue-600"
          onClick={toggleContent}
        >
          Open
        </button>

        {isExpanded && <div>{content}</div>}
      </div>
    </div>
  );
}

export default TodoItem;
