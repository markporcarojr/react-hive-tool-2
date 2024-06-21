import { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UserContext from "../context/UserContext.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const NotificationForm = ({ show, handleClose, setReminder }) => {
  const [email, setEmail] = useState("");
  const [interval, setInterval] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        //1- get response for all fields
        const response = await axios.get(`http://localhost:5555/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { email } = response.data.user;

        setEmail(email);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching data:", error);
        setMessage(error.response?.data?.message);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReminder(email, interval, message);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className="text-michgold">
      <Modal.Header closeButton>
        <Modal.Title>Set Reminder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
            />
          </Form.Group>

          <Form.Group controlId="formInterval">
            <Form.Label>Interval (in days)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter interval"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              required
              className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
            />
          </Form.Group>

          <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="form-control text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
            />
          </Form.Group>
          <div className="d-flex justify-content-around mt-3">
            <Button variant="primary" type="submit">
              Set Reminder
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NotificationForm;
