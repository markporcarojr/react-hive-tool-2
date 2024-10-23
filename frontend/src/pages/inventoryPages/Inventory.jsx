import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomNavbar from "../../components/layout/CustomNavbar";
import Footer from "../../components/layout/Footer";
import CustomModal from "../../components/Modal";
import LoadSpinner from "../../components/Spinner";
import UserContext from "../../context/UserContext";

const Inventory = () => {
  const [inventorys, setInventorys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/inventory?userId=${user._id}`)
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
      <Helmet>
        <meta
          name="description"
          content="Organize and manage beekeeping supplies and equipment. Track inventory levels, order replacements, and maintain a well-stocked apiary for smooth operations."
        />

        <title>Inventory</title>
      </Helmet>
      <CustomNavbar />
      <div className="p-4">
        <div className="d-flex justify-content-around mb-4 sticky-button">
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
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedInventorys.map((inventory) => (
                  <tr key={inventory._id} className=" align-middle">
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
                            size: "1.5em",
                            className: "darken-on-hover m-2",
                          }}
                        >
                          <IoInformationCircleOutline
                            onClick={() => handleClick(inventory)}
                          />
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: "1.5em",
                            className: "darken-on-hover m-2",
                          }}
                        >
                          <Link to={`/inventory/edit/${inventory._id}`}>
                            <MdModeEditOutline />
                          </Link>
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "red",
                            size: "1.5em",
                            className: "darken-on-hover m-2",
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
