// TodoForm.jsx
import { Form, Button } from "react-bootstrap";

const TodoForm = ({ todo, setTodo, handleSubmit }) => {
  return (
    <Form id="todo-form" onSubmit={handleSubmit}>
      <h1 className="m-4 fw-bold">To-do List:</h1>
      <div className="d-flex justify-content-center m-3">
        <Form.Control
          type="text"
          id="todo"
          name="todo"
          placeholder="Add a task..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="placeholder-text text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold rounded-start-pill"
        />
        <Button
          type="submit"
          form="todo-form"
          className="btn px-5 btn-michgold fw-bold rounded-end-pill"
        >
          ADD
        </Button>
      </div>
    </Form>
  );
};

export default TodoForm;
