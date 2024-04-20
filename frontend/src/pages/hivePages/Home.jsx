// Home.jsx
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";
import { IconContext } from "react-icons";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import UserContext from "../../context/UserContext";
import LoadSpinner from "../../components/Spinner";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import HiveCard from "../../components/HiveCard";
import ImageDisplay from "../../components/ImageDisplay";

const formatDate = (dateString) => {
  const utcDate = new Date(dateString);
  const options = { timeZone: "UTC" };
  return utcDate.toLocaleDateString("en-US", options);
};

const Home = () => {
  const [hives, setHives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHive, setSelectedHive] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/new-hive?userId=${user._id}`)
      .then((response) => {
        setHives(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hive data:", error);
        setLoading(false);
      });
  }, [user]);

  const handleShowModal = (hive) => {
    setSelectedHive(hive);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHive(null);
  };

  return (
    <>
      <CustomNavbar />
      <div id="title" className="container title">
        <h1 className="text-center text-white pt-2 outlined-text display-1 fw-bold apiary">
          {user.apiaryName ? user.apiaryName : "Your Apiary"} <br />
        </h1>
        <h5 className="card-title mt-3 fs-2 outlined-text" id="datetime"></h5>
        <div className="d-flex justify-content-between text-white align-items-center outlined-text fs-3 fw-bold my-1 me-2">
          <span className="card-text mb-0 ms-2 mt-" id="city">
            Ortonville
          </span>
          <div>
            <span className="card-text mb-0 text-white">☀️</span>
            <span className="card-text mb-0" id="temp">
              60℉
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="d-flex justify-content-around mb-4">
          <Link
            to="/hives/create/"
            className="btn btn-michgold rounded-pill fw-bold"
          >
            ADD HIVE
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
              responsive
              variant="dark"
              className="text-michgold table-responsive hive-table"
            >
              <thead className="fs-4 fw-bold text-center">
                <tr>
                  <th>Hive Image</th>
                  <th>Hive ID</th>
                  <th>Date Added</th>
                  <th>Queen Color</th>
                  <th>Queen Age</th>
                  <th>Hive Source</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {/* .sort(
                    (a, b) =>
                      new Date(b.inspectionDate) - new Date(a.inspectionDate)
                  ) */}
                {hives.map((hive) => (
                  <tr key={hive._id} className="text-center align-middle">
                    <td className="text-center">
                      <ImageDisplay
                        imageUrl={hive.hiveImage}
                        maxHeight={"100px"}
                        maxWidth={"100px"}
                      />
                    </td>
                    <td className="text-center fs-3">#{hive.hiveNumber}</td>
                    <td className="text-center">{formatDate(hive.hiveDate)}</td>
                    <td className="text-center">{hive.queenColor}</td>
                    <td className="text-center">{hive.queenAge}</td>
                    <td className="text-center">{hive.hiveSource}</td>
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
                            onClick={() => handleShowModal(hive)}
                          />
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: "2em",
                            className: "darken-on-hover",
                          }}
                        >
                          <Link to={`/hives/edit/${hive._id}`}>
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
                          <Link to={`/hives/delete/${hive._id}`}>
                            <FaTrashAlt />
                          </Link>
                        </IconContext.Provider>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
              <div
                style={{ borderColor: "#ffcb05" }}
                className="modal-border bg-card"
              >
                <Modal.Header className="d-flex justify-content-around">
                  <div className="container d-flex justify-content-center align-items-center">
                    {selectedHive && (
                      <ImageDisplay
                        imageUrl={selectedHive.hiveImage}
                        maxHeight={"400px"}
                        maxWidth={"400px"}
                        style={{
                          objectFit: "scale-down",
                        }}
                      />
                    )}
                  </div>
                </Modal.Header>
                <Modal.Body>
                  {selectedHive && <HiveCard hive={selectedHive} />}
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
