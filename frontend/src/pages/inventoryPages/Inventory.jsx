import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadSpinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import InventoryCard from "../../components/InventoryCard";

const Inventory = () => {
  const [inventorys, setInventorys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/inventory")
      .then((response) => {
        setInventorys(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <CustomNavbar />
      <div className="p-4">
        <div className="d-flex justify-content-around mb-3">
          <Link
            to="/inventory/create"
            className="btn btn-warning rounded-pill fw-bold"
          >
            ADD INVENTORY
          </Link>
        </div>
        {loading ? (
          <LoadSpinner />
        ) : (
          <div className="row row-cols-1 row-cols-lg-3 g-2">
            {inventorys.map((inventory) => (
              <InventoryCard key={inventory._id} inventory={inventory} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Inventory;
