//Inspection.jsx
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
import InspectionCard from "../../components/InspectionCard";

const formatDate = (dateString) => {
  const utcDate = new Date(dateString);
  const options = { timeZone: "UTC" };
  return utcDate.toLocaleDateString("en-US", options);
};

const InspectionPage = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/inspections?userId=${user._id}`)
      .then((response) => {
        setInspections(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inspection data:", error);
        setLoading(false);
      });
  }, []);

  const handleShowModal = (inspection) => {
    setSelectedInspection(inspection);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInspection(null);
  };

  return (
    <>
      <CustomNavbar />
      <div className="p-4 text-center">
        <div className="d-flex justify-content-around mb-4">
          <Link
            to="/inspections/create"
            className="btn btn-michgold rounded-pill fw-bold"
          >
            ADD INSPECTION
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
                  <th>Date</th>
                  <th>Hive Number</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {inspections
                  .sort(
                    (a, b) =>
                      new Date(b.inspectionDate) - new Date(a.inspectionDate)
                  )
                  .map((inspection) => (
                    <tr key={inspection._id}>
                      <td>{formatDate(inspection.inspectionDate)}</td>
                      <td>{inspection.hiveNumber}</td>
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
                              onClick={() => handleShowModal(inspection)}
                            />
                          </IconContext.Provider>
                          <IconContext.Provider
                            value={{
                              color: "green",
                              size: "2em",
                              className: "darken-on-hover",
                            }}
                          >
                            <Link to={`/inspections/edit/${inspection._id}`}>
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
                            <Link to={`/inspections/delete/${inspection._id}`}>
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
                  <Modal.Title className="text-michgold fs-3 fw-bold">
                    Inspection Details
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedInspection && (
                    <InspectionCard inspection={selectedInspection} />
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InspectionPage;
