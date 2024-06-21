import { useState } from "react";
import { FaBell } from "react-icons/fa";
import NotificationForm from "./NotificationForm";

const NotificationIcon = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const setReminder = (email, interval, message) => {
    // Send the reminder details to the backend
    fetch("/api/set-reminder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, interval, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Reminder set:", data);
      })
      .catch((error) => {
        console.error("Error setting reminder:", error);
      });
  };

  return (
    <>
      <FaBell onClick={handleShow} size={30} />
      <NotificationForm
        show={show}
        handleClose={handleClose}
        setReminder={setReminder}
      />
    </>
  );
};

export default NotificationIcon;
