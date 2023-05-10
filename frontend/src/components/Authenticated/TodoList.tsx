import TodoItem from "./TodoItem";

function TodoList() {
  return (
    <div className="container mx-28 w-3/6 shadow-md shadow-blue-500 md:m-0 md:w-auto">
      <h3 className="bg-blue-300 p-1 text-center text-2xl font-light">
        List Name
      </h3>
      <ul className="text-center text-lg ">
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
