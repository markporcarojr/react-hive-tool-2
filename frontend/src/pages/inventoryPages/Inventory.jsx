import { useEffect, useState, useContext } from "react";
import axios from "axios";
import LoadSpinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import UserContext from "../../context/UserContext";
import { Modal, Button, Table } from "react-bootstrap";
import { IconContext } from "react-icons";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import CustomModal from "../../components/Modal";

const Inventory = () => {
  const [inventorys, setInventorys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/inventory?userId=${user._id}`)
      .then((response) => {
        setInventorys(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        setLoading(false);
      });
  }, []);

  const handleClick = (inventory) => {
    setSelectedInventory(inventory);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInventory(null);
  };

  const sortedInventorys = inventorys.slice().sort((a, b) => {
    // Convert both inventoryType values to lowercase for case-insensitive sorting
    const inventoryTypeA = a.inventoryType.toLowerCase();
    const inventoryTypeB = b.inventoryType.toLowerCase();

    // Use localeCompare for string comparison
    return inventoryTypeA.localeCompare(inventoryTypeB);
  });

  return (
    <>
      <CustomNavbar />
      <div className="p-4">
        <div className="d-flex justify-content-around mb-4">
          <Link
            to="/inventory/create"
            className="btn btn-michgold rounded-pill fw-bold"
          >
            ADD INVENTORY
          </Link>
        </div>
        {loading ? (
          <LoadSpinner />
        ) : (
          <>
            <Table
              bordered
              striped
              hover
              // responsive
              variant="dark"
              className="text-michgold inventory-table"
            >
              <thead className="fs-4 fw-bold text-center">
                <tr>
                  <th>Inventory Item</th>
                  <th>Amount</th>
                  <th>Location</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {sortedInventorys.map((inventory) => (
                  <tr key={inventory._id}>
                    <td>{inventory.inventoryType}</td>
                    <td className="text-center">{inventory.inventoryAmount}</td>
                    <td className="text-center">
                      {inventory.inventoryLocation}
                    </td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <IconContext.Provider
                          value={{
                            color: "fccb05",
                            size: "2em",
                            className: "darken-on-hover",
                          }}
                        >
                          <IoInformationCircleOutline
                            onClick={() => handleClick(inventory)}
                          />
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: "2em",
                            className: "darken-on-hover",
                          }}
                        >
                          <Link to={`/inventory/edit/${inventory._id}`}>
                            <MdModeEditOutline />
                          </Link>
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "red",
                            size: "2em",
                            className: "darken-on-hover",
                          }}
                        >
                          <Link to={`/inventory/delete/${inventory._id}`}>
                            <FaTrashAlt />
                          </Link>
                        </IconContext.Provider>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
      <CustomModal
        show={showModal}
        onHide={handleCloseModal}
        selectedItem={selectedInventory}
        cardType="inventory"
      />
      <Footer />
    </>
  );
};

export default Inventory;
