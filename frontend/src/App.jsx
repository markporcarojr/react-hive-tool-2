import { Routes, Route } from "react-router-dom";
import Inspection from "./pages/Inspection.jsx";
import Inventory from "./pages/Inventory.jsx";
import Treatment from "./pages/Treatment.jsx";
import Harvest from "./pages/Harvest.jsx";
import Home from "./pages/Home.jsx";
import SwarmTrap from "./pages/SwarmTrap.jsx";
import Feeding from "./pages/Feeding.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

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
    </Routes>
  );
}

export default App;
