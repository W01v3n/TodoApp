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
    <div>
      <div>
        <span>{title}</span>
        <button onClick={toggleContent}>Show more</button>
      </div>
      {isExpanded && <div>{content}</div>}
    </div>
  );
}

export default TodoItem;
