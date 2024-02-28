import { Routes, Route } from "react-router-dom";
import Inspection from "./pages/Inspection.jsx";
import Inventory from "./pages/Inventory.jsx";
import Treatment from "./pages/Treatment.jsx";
import Harvest from "./pages/Harvest.jsx";
import Home from "./pages/Home.jsx";
import SwarmTrap from "./pages/SwarmTrap.jsx";
import Feeding from "./pages/Feeding.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/styles.scss";
import CreateHive from "./pages/CreateHive.jsx";
import DeleteHive from "./pages/DeleteHive.jsx";
import ShowHives from "./pages/ShowHives.jsx";
import EditHive from "./pages/EditHive.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inspections" element={<Inspection />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/treatment" element={<Treatment />} />
      <Route path="/harvest" element={<Harvest />} />
      <Route path="/swarmtraps" element={<SwarmTrap />} />
      <Route path="/feeding" element={<Feeding />} />

      <Route path="/hives/create" element={<CreateHive />} />
      <Route path="/hives/delete/:id" element={<DeleteHive />} />
      <Route path="/hives/details/:id" element={<ShowHives />} />
      <Route path="/hives/edit/:id " element={<EditHive />} />
    </Routes>
  );
}

export default App;
