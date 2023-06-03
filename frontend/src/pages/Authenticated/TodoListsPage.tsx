import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import TodoList from "../../components/Authenticated/TodoList";
import { useAuth } from "../../components/Context/AuthContext";
import { newList, getAllLists, deleteList } from "../../services/list.service";

interface NewListFormProps {
  onSubmit: (list: ITodoListObject) => void;
}

interface ITodoListObject {
  createdAt: Date;
  id: number;
  name: string;
  updatedAt: Date;
  userId: number;
}

function NewListForm({ onSubmit }: NewListFormProps) {
  const { currentUser } = useAuth();
  const [listName, setListName] = useState("");
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    // Check if the currentUser is loaded
    if (currentUser) {
      setIsUserLoaded(true);
    }
  }, [currentUser]);

  function handleListName(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setListName(name);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!isUserLoaded) {
      return;
    }

    const userId = currentUser?.id;

    if (userId) {
      const newlistData = {
        name: listName,
        userId: userId,
      };

      // console.log(userId);
      const createdList = await newList(newlistData);

      if (createdList) {
        onSubmit(createdList);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="my-8 text-center md:mx-14 md:my-5 md:text-left"
    >
      <div className="container">
        <TextField
          color="primary"
          inputRef={(input) => input && input.focus()}
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
  const [todoLists, setTodoLists] = useState<Array<ITodoListObject>>([]);

  function handleNewListButton() {
    setIsFormOpen(!isFormOpen);
  }

  async function fetchLists() {
    const lists = await getAllLists();
    setTodoLists(lists);
  }

  function handleNewListSubmit(list: ITodoListObject) {
    // console.log(todoLists);

    if (todoLists) {
      setTodoLists((prevLists) => [...prevLists, list]);
    } else {
      fetchLists();
    }

    setIsFormOpen(false);
  }

  function handleDeleteList(list: ITodoListObject) {
    deleteList(list.id);
    setTodoLists((prevLists) =>
      prevLists.filter((nameOfList) => nameOfList !== list)
    );
  }

  useEffect(() => {
    const fetchLists = async () => {
      const lists = await getAllLists();
      setTodoLists(lists || []);
    };

    fetchLists();
  }, []);

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
        {todoLists &&
          todoLists.map((list, index) => (
            <TodoList
              key={typeof list !== "string" ? list.id : index}
              list={list}
              onDelete={handleDeleteList}
            />
          ))}
      </div>
    </div>
  );
}

export { NewListForm };
export default TodoListsPage;
