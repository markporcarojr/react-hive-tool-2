import { useState, useContext, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar.jsx";
import Footer from "../../components/Footer.jsx";
import LoadSpinner from "../../components/Spinner.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import UserContext from "../../context/UserContext.jsx";
import { IconContext } from "react-icons";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import NotificationForm from "../../components/NotificationForm.jsx";

const TodoList = () => {
  const { user } = useContext(UserContext);
  const [todo, setTodo] = useState("");
  const [todoDisplay, setTodoDisplay] = useState([
    { todo: "", completed: false },
  ]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  // Notification state and functions
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const setReminder = async (email, interval, message) => {
    try {
      const response = await fetch("/api/set-reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, interval, message }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || errorText);
        } catch (e) {
          throw new Error(errorText);
        }
      }

      const dataText = await response.text();
      const data = dataText ? JSON.parse(dataText) : {};
      console.log("Reminder set:", data);
    } catch (error) {
      console.error("Error setting reminder:", error.message, error);
    }
  };

  const handleDeleteTodo = (id) => {
    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_BACKEND_API}/todo/${id}`)
      .then(() => {
        setLoading(false);
        // Remove the deleted todo from todoDisplay
        setTodoDisplay((prevTodoDisplay) =>
          prevTodoDisplay.filter((todo) => todo._id !== id)
        );
      })
      .catch((error) => {
        setLoading(false);
        alert("An error has occurred. Please Check Console");
        console.log(error);
      });
  };

  const handleEditTodo = (id) => {
    const data = {
      todo,
    };
    setLoading(true);
    axios
      .put(`${import.meta.env.VITE_BACKEND_API}/todo/${id}`, data)
      .then(() => {
        setLoading(false);
        // Find the index of the edited todo in todoDisplay array
        const editedIndex = todoDisplay.findIndex(
          (todoItem) => todoItem._id === id
        );
        if (editedIndex !== -1) {
          // Create a copy of todoDisplay
          const updatedTodoDisplay = [...todoDisplay];
          // Update the edited todo item in the copy
          updatedTodoDisplay[editedIndex] = {
            ...updatedTodoDisplay[editedIndex],
            todo: data.todo,
          };
          // Update the state with the updated todoDisplay
          setTodoDisplay(updatedTodoDisplay);
        }
        // Reset edit state to false to switch back to the todo-form
        setEdit(false);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response.data.message);
        console.log(error);
      });
  };

  const toggleComplete = (id) => {
    setTodoDisplay(
      todoDisplay.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleEdit = (id) => {
    setEditTodoId(id);
    // Find the todo corresponding to the clicked ID and update the todo state
    const selectedTodo = todoDisplay.find((todo) => todo._id === id);
    if (selectedTodo) {
      setTodo(selectedTodo.todo);
    }
    setEdit((prevEdit) => !prevEdit);
  };
  useEffect(() => {
    // Populate todo state with the todo value when edit mode is activated
    if (edit && todoDisplay.length > 0) {
      const todoToEdit = todoDisplay.find((todoItem) => todoItem._id === id);
      if (todoToEdit) {
        setTodo(todoToEdit.todo);
      }
    }
  }, [edit, id, todoDisplay]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/todo?userId=${user._id}`)
      .then((response) => {
        setTodoDisplay(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        setLoading(false);
      });
  }, [user]);

  const handleSaveTodo = (e) => {
    e.preventDefault();
    const data = {
      todo,
      userId: user._id,
    };

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_API}/todo`, data)
      .then((response) => {
        setLoading(false);
        setTodoDisplay((prevTodoDisplay) => [
          ...prevTodoDisplay,
          response.data,
        ]);
        setTodo(""); // Clear the input field after successful submission
        navigate("/todo");
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <>
      <CustomNavbar />
      {loading ? (
        <LoadSpinner />
      ) : (
        <Container>
          <Card className="text-michgold text-center mt-2 mb-5">
            {/* Forms */}
            {edit ? (
              <Form
                id="editTodo-form"
                onSubmit={() => handleEditTodo(editTodoId)}
              >
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
                    // style={{ fontSize: "24px" }}
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
            ) : (
              <Form id="todo-form" onSubmit={handleSaveTodo}>
                <h1 className="m-4 fw-bold">To-do List:</h1>
                <div className="d-flex justify-content-center m-3">
                  <Form.Control
                    type="text"
                    id="todo"
                    name="todo"
                    placeholder="Add a task..."
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
            )}
            {/* Form end */}

            <div className="d-flex justify-content-around mb-3"></div>
            <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
            {todoDisplay.map((todo, index) => (
              <div
                className={`todo d-flex justify-content-between m-2 p-2 ${
                  todo.completed ? "complete" : ""
                }`}
                key={todo._id}
              >
                <h3
                  onClick={() => toggleComplete(todo._id)}
                  style={{
                    wordWrap: "break-word",
                    maxWidth: "80%",
                  }}
                >
                  {index + 1}- {todo.todo}
                </h3>
                <div className="d-flex flex-row align-items-center">
                  <IconContext.Provider
                    value={{
                      color: "gold",
                      size: "2em",
                      className: "darken-on-hover me-3",
                    }}
                  >
                    <FaBell onClick={handleShow} size={30} />
                  </IconContext.Provider>
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
            ))}
          </Card>
        </Container>
      )}
      <div className="text-michgold">
        <NotificationForm
          show={show}
          handleClose={handleClose}
          setReminder={setReminder}
        />
      </div>
      <Footer />
    </>
  );
};

export default TodoList;
