import { Routes, Route } from "react-router-dom";
import Harvest from "./pages/Harvest.jsx";
import SwarmTrap from "./pages/SwarmTrap.jsx";
import Feeding from "./pages/Feeding.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./scss/custom.scss";
import "./scss/styles.scss";

import Home from "./pages/hivePages/Home.jsx";
import CreateHive from "./pages/hivePages/CreateHive.jsx";
import DeleteHive from "./pages/hivePages/DeleteHive.jsx";
import EditHive from "./pages/hivePages/EditHive.jsx";

import Inspection from "./pages/inspectionPages/Inspection.jsx";
import CreateInspection from "./pages/inspectionPages/CreateInspection.jsx";
import EditInspection from "./pages/inspectionPages/EditInspection.jsx";
import DeleteInspection from "./pages/inspectionPages/DeleteInspection.jsx";

import Inventory from "./pages/inventoryPages/Inventory.jsx";
import CreateInventory from "./pages/inventoryPages/CreateInventory.jsx";
import EditInventory from "./pages/inventoryPages/EditInventory.jsx";
import DeleteInventory from "./pages/inventoryPages/DeleteInventory.jsx";

import Treatment from "./pages/treatmentPages/Treatment.jsx";
import EditTreatment from "./pages/treatmentPages/EditTreatment.jsx";
import CreateTreatment from "./pages/treatmentPages/CreateTreatment.jsx";
import DeleteTreatment from "./pages/treatmentPages/DeleteTreatment.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hives/create" element={<CreateHive />} />
      <Route path="/hives/delete/:id" element={<DeleteHive />} />
      <Route path="/hives/edit/:id" element={<EditHive />} />

      <Route path="/inspections" element={<Inspection />} />
      <Route path="/inspections/create" element={<CreateInspection />} />
      <Route path="/inspections/delete/:id" element={<DeleteInspection />} />
      <Route path="/inspections/edit/:id" element={<EditInspection />} />

      <Route path="/inventory" element={<Inventory />} />
      <Route path="/inventory/create" element={<CreateInventory />} />
      <Route path="/inventory/delete/:id" element={<DeleteInventory />} />
      <Route path="/inventory/edit/:id" element={<EditInventory />} />

      <Route path="/treatments" element={<Treatment />} />
      <Route path="/treatments/create" element={<CreateTreatment />} />
      <Route path="/treatments/delete/:id" element={<DeleteTreatment />} />
      <Route path="/treatments/edit/:id" element={<EditTreatment />} />

      <Route path="/harvest" element={<Harvest />} />
      <Route path="/swarmtraps" element={<SwarmTrap />} />
      <Route path="/feeding" element={<Feeding />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
