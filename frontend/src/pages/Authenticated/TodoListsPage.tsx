import { useState } from "react";
import { TextField } from "@mui/material";
import TodoList from "../../components/Authenticated/TodoList";

interface NewListFormProps {
  onSubmit: (listName: string) => void;
}

function NewListForm({ onSubmit }: NewListFormProps) {
  const [listName, setListName] = useState("");

  function handleListName(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setListName(name);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit(listName);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="my-8 text-center md:mx-14 md:my-5 md:text-left"
    >
      <div className="container">
        <TextField
          color="primary"
          type="text"
          label="List Name"
          value={listName}
          required
          id="listName"
          onChange={handleListName}
        />
        <button
          type="submit"
          className="mx-2 bg-blue-400 p-3 text-white opacity-90 shadow-lg shadow-blue-500 transition-all duration-150 hover:shadow-lg hover:shadow-blue-500 active:bg-blue-600 active:shadow-lg active:shadow-blue-600"
        >
          Create
        </button>
      </div>
    </form>
  );
}

function TodoListsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [todoLists, setTodoLists] = useState<Array<string>>([]);

  function handleNewListButton() {
    setIsFormOpen(!isFormOpen);
  }

  function handleNewListSubmit(listName: string) {
    setTodoLists((prevLists) => [...prevLists, listName]);
    setIsFormOpen(false);
  }

  return (
    <div>
      <h1 className="my-8 text-center text-3xl font-light md:mb-5 md:ml-14 md:mt-8 md:text-left">
        My TodoLists
      </h1>
      <div className="my-5 flex justify-evenly md:mx-14 md:justify-normal">
        <button
          onClick={handleNewListButton}
          className="bg-blue-400 p-2 text-white opacity-90 shadow-lg shadow-blue-500 transition-all duration-150 hover:shadow-lg hover:shadow-blue-500 active:bg-blue-600 active:shadow-lg active:shadow-blue-600"
        >
          New List
        </button>
      </div>
      {isFormOpen && <NewListForm onSubmit={handleNewListSubmit} />}
      <div className="mb-20 grid grid-cols-1 gap-10 md:mx-14 md:grid-cols-4 md:items-start md:gap-10">
        {todoLists.map((listName, index) => (
          <TodoList key={index} listName={listName} />
        ))}
      </div>
    </div>
  );
}

export default TodoListsPage;
