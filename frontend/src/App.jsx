// App.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/styles.scss";

import { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import LoadSpinner from "./components/Spinner.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import UserContext from "./context/UserContext.jsx";

import Home from "./pages/hivePages/Home.jsx";
import CreateHive from "./pages/hivePages/CreateHive.jsx";
import EditHive from "./pages/hivePages/EditHive.jsx";
import DeleteHive from "./pages/hivePages/DeleteHive.jsx";

import Inspection from "./pages/inspectionPages/Inspection.jsx";
import CreateInspection from "./pages/inspectionPages/CreateInspection.jsx";
import EditInspection from "./pages/inspectionPages/EditInspection.jsx";
import DeleteInspection from "./pages/inspectionPages/DeleteInspection.jsx";

import Inventory from "./pages/inventoryPages/Inventory.jsx";
import CreateInventory from "./pages/inventoryPages/CreateInventory.jsx";
import EditInventory from "./pages/inventoryPages/EditInventory.jsx";
import DeleteInventory from "./pages/inventoryPages/DeleteInventory.jsx";

import Harvest from "./pages/harvestPages/Harvest.jsx";
import CreateHarvest from "./pages/harvestPages/CreateHarvest.jsx";
import EditHarvest from "./pages/harvestPages/EditHarvest.jsx";
import DeleteHarvest from "./pages/harvestPages/DeleteHarvest.jsx";

import Swarm from "./pages/swarmPages/Swarm.jsx";
import CreateSwarm from "./pages/swarmPages/CreateSwarm.jsx";
import EditSwarm from "./pages/swarmPages/EditSwarm.jsx";
import DeleteSwarm from "./pages/swarmPages/DeleteSwarm.jsx";

import Login from "./pages/userPages/Login.jsx";
import Register from "./pages/userPages/Register.jsx";
import ForgotPassword from "./pages/userPages/ForgotPassword.jsx";
import ResetPassword from "./pages/userPages/ResetPassword.jsx";
import DeleteUser from "./pages/userPages/DeleteUser.jsx";
import UpdateUserForm from "./pages/userPages/UpdateUserForm.jsx";
import PrivacyPolicy from "./pages/userPages/PrivacyPolicy.jsx";

import TodoList from "./pages/todoPages/TodoList.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Changed initial value to true
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_API}/user/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate("/");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []); // Add 'token' to the dependency array

  if (loading) {
    return <LoadSpinner />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/update/:id" element={<UpdateUserForm />} />

          <Route path="/" element={<Home />} />
          <Route path="/hives/create" element={<CreateHive />} />
          <Route path="/hives/delete/:id" element={<DeleteHive />} />
          <Route path="/hives/edit/:id" element={<EditHive />} />

          <Route path="/inspections" element={<Inspection />} />
          <Route path="/inspections/create" element={<CreateInspection />} />
          <Route
            path="/inspections/delete/:id"
            element={<DeleteInspection />}
          />
          <Route path="/inspections/edit/:id" element={<EditInspection />} />

          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/create" element={<CreateInventory />} />
          <Route path="/inventory/delete/:id" element={<DeleteInventory />} />
          <Route path="/inventory/edit/:id" element={<EditInventory />} />

          <Route path="/harvest" element={<Harvest />} />
          <Route path="/harvest/create" element={<CreateHarvest />} />
          <Route path="/harvest/edit/:id" element={<EditHarvest />} />
          <Route path="/harvest/delete/:id" element={<DeleteHarvest />} />

          <Route path="/swarm" element={<Swarm />} />
          <Route path="/swarm/create" element={<CreateSwarm />} />
          <Route path="/swarm/edit/:id" element={<EditSwarm />} />
          <Route path="/swarm/delete/:id" element={<DeleteSwarm />} />

          <Route path="/todo" element={<TodoList />} />
        </Route>

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/user/delete/:id" element={<DeleteUser />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
