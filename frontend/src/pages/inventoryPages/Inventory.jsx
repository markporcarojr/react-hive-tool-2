import { useEffect, useState, useContext } from "react";
import axios from "axios";
import LoadSpinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import InventoryCard from "../../components/InventoryCard";
import UserContext from "../../context/UserContext";
import { Modal, Button, Table } from "react-bootstrap";
import { IconContext } from "react-icons";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const formatDate = (dateString) => {
  const utcDate = new Date(dateString);
  const options = { timeZone: "UTC" };
  return utcDate.toLocaleDateString("en-US", options);
};

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
  }, [user]);

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
            className="btn btn-warning rounded-pill fw-bold"
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
              className="text-michgold"
            >
              <thead className="fs-4 fw-bold text-center">
                <tr>
                  <th>Inventory Item</th>
                  <th>Amount</th>
                  <th>Location</th>
                  <th>Action</th>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <div
          style={{ borderColor: "#ffcb05" }}
          className="modal-border bg-card"
        >
          <Modal.Header className="d-flex justify-content-around">
            <Modal.Title className="text-michgold fs-3 fw-bold">
              Inventory Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="border-michgold rounded-5 border-3 bg-card">
            {selectedInventory && (
              <InventoryCard inventory={selectedInventory} />
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <div className="d-grid gap-2">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleCloseModal}
                as="block"
              >
                Close
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
      <Footer />
    </>
  );
};

export default Inventory;
