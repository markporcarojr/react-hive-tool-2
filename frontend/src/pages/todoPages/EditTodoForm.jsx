// EditTodoForm.jsx
import { Form, Button } from "react-bootstrap";

const EditTodoForm = ({ todo, setTodo, handleSubmit }) => {
  return (
    <Form id="editTodo-form" onSubmit={handleSubmit}>
      <h1 className="m-4 fw-bold">Edit To-Do</h1>
      <div className="d-flex justify-content-center m-3">
        <Form.Control
          type="text"
          id="editTodo"
          name="editTodo"
          value={todo}
          placeholder="Make An Edit"
          onChange={(e) => setTodo(e.target.value)}
          className="placeholder-text text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold rounded-start-pill"
        />
        <Button
          type="submit"
          form="editTodo-form"
          className="btn px-5 btn-michgold fw-bold rounded-end-pill"
        >
          UPDATE
        </Button>
      </div>
    </Form>
  );
};

export default EditTodoForm;
