import { useEffect, useState, useContext } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import SwarmCard from "../../components/SwarmCard";
import UserContext from "../../context/UserContext";
import { Modal, Button, Table } from "react-bootstrap";
import { IconContext } from "react-icons";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import ImageDisplay from "../../components/ImageDisplay";

const formatDate = (dateString) => {
  const utcDate = new Date(dateString);
  const options = { timeZone: "UTC" };
  return utcDate.toLocaleDateString("en-US", options);
};

export default function Swarm() {
  const [swarms, setSwarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSwarm, setSelectedSwarm] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/swarm?userId=${user._id}`)
      .then((response) => {
        setSwarms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        setLoading(false);
      });
  }, []);

  const handleClick = (harvest) => {
    setSelectedSwarm(harvest);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSwarm(null);
  };

  return (
    <>
      <CustomNavbar />
      <div className="p-4">
        <div className="d-flex justify-content-around mb-3">
          <Link
            to="/swarm/create"
            className="btn btn-michgold rounded-pill fw-bold"
          >
            ADD SWARM
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
              className="text-michgold swarm-table"
            >
              <thead className="fs-4 fw-bold text-center">
                <tr>
                  <th>Swarm Image</th>
                  <th>Date</th>
                  <th>Trap Number</th>
                  <th>Location</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {swarms.map((swarm) => (
                  <tr key={swarm._id}>
                    <td className="text-center">
                      <ImageDisplay
                        imageUrl={swarm.swarmImage}
                        maxHeight={"100px"}
                        maxWidth={"100px"}
                        alt={"Swarm Image"}
                      />
                    </td>
                    <td className="text-center">
                      {formatDate(swarm.swarmDate)}
                    </td>
                    <td className="text-center">{swarm.swarmNumber}</td>
                    <td className="text-center">{swarm.location}</td>

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
                            onClick={() => handleClick(swarm)}
                          />
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: "2em",
                            className: "darken-on-hover",
                          }}
                        >
                          <Link to={`/swarm/edit/${swarm._id}`}>
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
                          <Link to={`/swarm/delete/${swarm._id}`}>
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
              {selectedSwarm && (
                <ImageDisplay
                  imageUrl={selectedSwarm.swarmImage}
                  maxHeight={"400px"}
                  maxWidth={"400px"}
                  style={{
                    objectFit: "scale-down",
                  }}
                />
              )}
            </Modal.Header>
            <Modal.Body className="border-michgold rounded-5 border-3 bg-card">
              {selectedSwarm && <SwarmCard swarm={selectedSwarm} />}
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
