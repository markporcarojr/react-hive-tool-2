import { useEffect, useState, useContext } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import HarvestCard from "../../components/HarvestCard";
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

export default function Harvest() {
  const [harvests, setHarvests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedHarvest, setSelectedHarvest] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/harvest?userId=${user._id}`)
      .then((response) => {
        setHarvests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching harvest data:", error);
        setLoading(false);
      });
  }, [user]);

  const handleClick = (harvest) => {
    setSelectedHarvest(harvest);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHarvest(null);
  };

  return (
    <>
      <CustomNavbar />
      <div className="p-4">
        <div className="d-flex justify-content-around mb-3">
          <Link
            to="/harvest/create"
            className="btn btn-michgold rounded-pill fw-bold"
          >
            ADD HARVEST
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
                  <th>Date</th>
                  <th>Harvest Type</th>
                  <th>Amount</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {harvests.map((harvest) => (
                  <tr key={harvest._id}>
                    <td className="text-center">
                      {formatDate(harvest.harvestDate)}
                    </td>
                    <td className="text-center">{harvest.harvestType}</td>
                    <td className="text-center">{harvest.harvestAmount} lbs</td>

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
                            onClick={() => handleClick(harvest)}
                          />
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: "2em",
                            className: "darken-on-hover",
                          }}
                        >
                          <Link to={`/harvest/edit/${harvest._id}`}>
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
                          <Link to={`/harvest/delete/${harvest._id}`}>
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
        <Modal show={showModal} onHide={handleCloseModal}>
          <div
            style={{ borderColor: "#ffcb05" }}
            className="modal-border bg-card"
          >
            <Modal.Header className="d-flex justify-content-around">
              <Modal.Title className="text-michgold fs-3 fw-bold">
                Harvest Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="border-michgold rounded-5 border-3 bg-card">
              {selectedHarvest && <HarvestCard harvest={selectedHarvest} />}
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
      </div>

      <Footer />
    </>
  );
}
