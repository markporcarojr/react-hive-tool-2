// App.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/styles.scss";

import { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import LoadSpinner from "./components/Spinner.tsx";
import PrivateRoutes from "./components/PrivateRoutes.tsx";
import UserContext from "./context/UserContext.tsx";

import Home from "./pages/hivePages/Home.tsx";
import CreateHive from "./pages/hivePages/CreateHive.tsx";
import EditHive from "./pages/hivePages/EditHive.tsx";
import DeleteHive from "./pages/hivePages/DeleteHive.tsx";

import Inspection from "./pages/inspectionPages/Inspection.tsx";
import CreateInspection from "./pages/inspectionPages/CreateInspection.tsx";
import EditInspection from "./pages/inspectionPages/EditInspection.tsx";
import DeleteInspection from "./pages/inspectionPages/DeleteInspection.tsx";

import Inventory from "./pages/inventoryPages/Inventory.tsx";
import CreateInventory from "./pages/inventoryPages/CreateInventory.tsx";
import EditInventory from "./pages/inventoryPages/EditInventory.tsx";
import DeleteInventory from "./pages/inventoryPages/DeleteInventory.tsx";

import Harvest from "./pages/harvestPages/Harvest.tsx";
import CreateHarvest from "./pages/harvestPages/CreateHarvest.tsx";
import EditHarvest from "./pages/harvestPages/EditHarvest.tsx";
import DeleteHarvest from "./pages/harvestPages/DeleteHarvest.tsx";

import Swarm from "./pages/swarmPages/Swarm.tsx";
import CreateSwarm from "./pages/swarmPages/CreateSwarm.tsx";
import EditSwarm from "./pages/swarmPages/EditSwarm.tsx";
import DeleteSwarm from "./pages/swarmPages/DeleteSwarm.tsx";

import DeleteUser from "./pages/userPages/DeleteUser.tsx";
import ForgotPassword from "./pages/userPages/ForgotPassword.tsx";
import Login from "./pages/userPages/Login.tsx";
import PrivacyPolicy from "./pages/userPages/PrivacyPolicy.tsx";
import Register from "./pages/userPages/Register.tsx";
import ResetPassword from "./pages/userPages/ResetPassword.tsx";
import UpdateUserForm from "./pages/userPages/UpdateUserForm.tsx";

import TodoList from "./pages/todoPages/TodoList.tsx";

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
