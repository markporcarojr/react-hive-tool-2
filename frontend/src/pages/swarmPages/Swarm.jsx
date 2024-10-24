import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import ImageDisplay from "../../components/ImageDisplay";
import CustomNavbar from "../../components/layout/CustomNavbar";
import Footer from "../../components/layout/Footer";
import CustomModal from "../../components/Modal.jsx";
import LoadSpinner from "../../components/Spinner";
import UserContext from "../../context/UserContext";

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
      .get(`${import.meta.env.VITE_BACKEND_API}/swarm?userId=${user._id}`)
      .then((response) => {
        setSwarms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
        setLoading(false);
      });
  }, []);

  const handleClick = (swarm) => {
    setSelectedSwarm(swarm);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSwarm(null);
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Implement effective swarm management strategies with specialized traps. Safely capture and relocate swarms to prevent colony losses and maintain hive stability."
        />

        <title>Swarm Traps</title>
      </Helmet>
      <CustomNavbar />
      <div className="p-4">
        <div className="d-flex justify-content-around mb-3 sticky-button">
          <Link
            to="/swarm/create"
            className="btn btn-michgold rounded-pill fw-bold"
          >
            ADD TRAP
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
                  <th>Trap #</th>
                  <th>Date</th>
                  <th>Image</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {swarms.map((swarm) => (
                  <tr key={swarm._id} className="text-center align-middle">
                    <td className="text-center">{swarm.swarmNumber}</td>
                    <td className="text-center">
                      {formatDate(swarm.swarmDate)}
                    </td>
                    <td
                      className="text-center"
                      onClick={() => handleClick(swarm)}
                    >
                      <ImageDisplay
                        imageUrl={swarm.swarmImage}
                        maxHeight={"100px"}
                        maxWidth={"100px"}
                        alt={"Swarm Image"}
                      />
                    </td>
                    <td className="text-center">{swarm.location}</td>

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
                            onClick={() => handleClick(swarm)}
                          />
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: "1.5em",
                            className: "darken-on-hover m-2",
                          }}
                        >
                          <Link to={`/swarm/edit/${swarm._id}`}>
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
        <CustomModal
          show={showModal}
          onHide={handleCloseModal}
          selectedItem={selectedSwarm}
          cardType="swarm"
        />
      </div>

      <Footer />
    </>
  );
}
