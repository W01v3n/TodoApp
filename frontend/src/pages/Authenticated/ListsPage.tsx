import TodoList from "../../components/Authenticated/TodoList";

function TodoListsPage() {
  return (
    <div>
      <h1 className="my-8 text-center text-3xl font-light md:mb-5 md:ml-14 md:mt-8 md:text-left">
        My TodoLists
      </h1>
      <div className="mb-20 grid grid-cols-1 gap-10 md:mx-14 md:grid-cols-4 md:gap-10">
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
        <TodoList />
      </div>
    </div>
  );
}

export default TodoListsPage;
