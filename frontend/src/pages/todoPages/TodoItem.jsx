// TodoItem.jsx
import { IconContext } from "react-icons";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const TodoItem = ({
  todo,
  index,
  toggleComplete,
  toggleEdit,
  handleDeleteTodo,
}) => {
  return (
    <div
      className={`todo d-flex justify-content-between m-2 p-2 ${
        todo.completed ? "complete" : ""
      }`}
      key={todo._id}
    >
      <h3
        onClick={() => toggleComplete(todo._id)}
        style={{ wordWrap: "break-word", maxWidth: "80%" }}
      >
        {index + 1} - {todo.todo}
      </h3>
      <div>
        <IconContext.Provider
          value={{
            color: "green",
            size: "2em",
            className: "darken-on-hover me-3",
          }}
        >
          <MdModeEditOutline onClick={() => toggleEdit(todo._id)} />
        </IconContext.Provider>
        <IconContext.Provider
          value={{
            color: "red",
            size: "2em",
            className: "darken-on-hover",
          }}
        >
          <FaTrashAlt onClick={() => handleDeleteTodo(todo._id)} />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default TodoItem;
