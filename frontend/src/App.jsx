import { Routes, Route } from "react-router-dom";
import Inspection from "./pages/Inspection.jsx";
import Inventory from "./pages/Inventory.jsx";
import Treatment from "./pages/Treatment.jsx";
import Harvest from "./pages/Harvest.jsx";
import Home from "./pages/Home.jsx";
import SwarmTrap from "./pages/SwarmTrap.jsx";
import Feeding from "./pages/Feeding.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./scss/custom.scss";
import "./scss/styles.scss";
import CreateHive from "./pages/hivePages/CreateHive.jsx";
import DeleteHive from "./pages/hivePages/DeleteHive.jsx";
import ShowHives from "./pages/ShowHives.jsx";
import EditHive from "./pages/hivePages/EditHive.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hives/create" element={<CreateHive />} />
      <Route path="/hives/delete/:id" element={<DeleteHive />} />
      <Route path="/hives/edit/:id" element={<EditHive />} />

      <Route path="/inspections" element={<Inspection />} />

      <Route path="/inventory" element={<Inventory />} />
      <Route path="/treatment" element={<Treatment />} />
      <Route path="/harvest" element={<Harvest />} />
      <Route path="/swarmtraps" element={<SwarmTrap />} />
      <Route path="/feeding" element={<Feeding />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
