import { ChangeEvent, useState } from "react";
import TodoItem from "./TodoItem";
import { TextField } from "@mui/material";

interface TodoItemProps {
  title: string;
  content?: string;
  parentIsOpen: boolean;
}

interface ITodoListObject {
  createdAt: Date;
  id: number;
  name: string;
  updatedAt: Date;
  userId: number;
}

interface TodoListProps {
  list: ITodoListObject;
  onDelete: (list: ITodoListObject) => void;
}

interface NewItemFormProps {
  onSubmit: (list: TodoItemProps) => void;
}

function NewItemForm({ onSubmit }: NewItemFormProps) {
  const [itemName, setItemName] = useState("");
  const [itemContent, setItemContent] = useState("");

  function handleItemName(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setItemName(name);
  }

  function handleItemContent(event: ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    setItemContent(content);
  }

  function handleSubmit(event: React.FormEvent) {
    const newItem: TodoItemProps = {
      title: itemName,
      content: itemContent,
      parentIsOpen: true,
    };
    event.preventDefault();
    onSubmit(newItem);
    setItemName("");
    setItemContent("");
  }

  return (
    <div className="shadow shadow-blue-500">
      <form onSubmit={handleSubmit}>
        <div className="mx-4 grid grid-cols-1 grid-rows-3 gap-4 py-2 md:mx-0 md:grid-cols-8">
          <TextField
            className="md:col-span-4 md:col-start-3"
            color="primary"
            type="text"
            label="Item Name"
            value={itemName}
            required
            id="itemName"
            onChange={handleItemName}
          />
          <TextField
            className="md:col-span-4 md:col-start-3"
            color="primary"
            type="text"
            label="Item Content"
            value={itemContent}
            id="itemContent"
            onChange={handleItemContent}
          />

          <div className="col-span-full row-start-3 my-2">
            <button className="bg-blue-400 px-3 py-1 text-white opacity-90 shadow-lg shadow-blue-500 transition-all duration-150 hover:shadow-xl hover:shadow-blue-500 active:bg-blue-600 active:shadow-lg active:shadow-blue-600">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function TodoList({ list, onDelete }: TodoListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewListFormOpen, setIsNewListFormOpen] = useState(false);
  const [todoItems, setTodoItems] = useState<Array<TodoItemProps>>([]);

  function toggleContent() {
    setIsOpen(!isOpen);
    setIsNewListFormOpen(false);
  }

  function handleNewItemSubmit(newItem: TodoItemProps) {
    setTodoItems((prevItems) => [...prevItems, newItem]);
    setIsNewListFormOpen(!isNewListFormOpen);
  }

  function toggleNewItemForm() {
    setIsNewListFormOpen(!isNewListFormOpen);
  }

  function handleDeleteItem(title: string) {
    setTodoItems((prevItems) =>
      prevItems.filter((item) => item.title !== title)
    );
  }

  return (
    <div className="container mx-8 w-5/6 shadow-md shadow-blue-400 md:m-0 md:w-auto">
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-400 to-blue-300 shadow-md shadow-blue-500">
        <button
          className="m-2 bg-blue-400 p-2 text-white opacity-90 shadow-md shadow-blue-500 transition-all duration-150 hover:shadow-lg hover:shadow-blue-600 active:bg-blue-600 active:shadow-lg active:shadow-blue-600"
          onClick={toggleContent}
        >
          {isOpen ? "Close" : "Open"}
        </button>
        <h3 className="mx-auto inline-block w-auto flex-grow truncate p-1 text-center text-2xl font-light text-white">
          {typeof list !== "string" && list.name}
        </h3>
        <button
          className="m-2 bg-red-500 px-1 py-1 text-base text-white opacity-90 shadow-md shadow-red-500 transition-all duration-150 hover:shadow-lg hover:shadow-red-600 active:bg-red-600 active:shadow-lg active:shadow-red-700"
          onClick={() => onDelete(list)}
        >
          Delete
        </button>
      </div>

      <ul
        className={`${
          isOpen ? "max-h-[128rem] opacity-100" : "max-h-0 opacity-0"
        } text-center text-lg transition-all duration-300 ease-in`}
      >
        {todoItems.map((item, index) => (
          <TodoItem
            key={index}
            title={item.title}
            content={item.content}
            parentIsOpen={isOpen ? true : false}
            onDelete={handleDeleteItem}
          />
        ))}
        <li>
          <div className="shadow shadow-blue-500">
            <button
              className={`${
                isNewListFormOpen
                  ? "m-0 max-h-0 p-0 opacity-0 shadow-none"
                  : "max-h-[32rem] opacity-100"
              } m-4 bg-blue-400 p-1 text-white opacity-90 shadow-lg shadow-blue-500 transition-all duration-150 hover:shadow-lg hover:shadow-blue-600 active:bg-blue-600 active:shadow-lg active:shadow-blue-600`}
              onClick={toggleNewItemForm}
            >
              New Item
            </button>
            {isNewListFormOpen && (
              <NewItemForm onSubmit={handleNewItemSubmit} />
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TodoList;
