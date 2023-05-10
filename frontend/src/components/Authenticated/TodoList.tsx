import { useState } from "react";
import TodoItem from "./TodoItem";

function TodoList() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleContent() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="container mx-28 w-3/6 shadow-md shadow-blue-500 md:m-0 md:w-auto">
      <h3 className="bg-blue-300 p-1 text-center text-2xl font-light">
        List Name
      </h3>
      <button
        className="m-2 bg-blue-400 p-2 opacity-90 shadow-md shadow-blue-500 transition-all duration-150 hover:shadow-lg hover:shadow-blue-500 active:shadow-lg active:shadow-blue-600"
        onClick={toggleContent}
      >
        Open
      </button>
      <ul
        className={`${
          isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden text-center text-lg transition-all duration-300 ease-in`}
      >
        <li>
          <TodoItem title="Test Item1" content="This is a content!" />
        </li>
        <li>
          <TodoItem title="Test Item2" content="This is a content!" />
        </li>
        <li>
          <TodoItem title="Test Item3" content="This is a content!" />
        </li>
      </ul>
    </div>
  );
}

export default TodoList;
