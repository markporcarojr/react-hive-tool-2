import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import LoadSpinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import { Modal, Button, Table } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import InspectionCard from "../../components/InspectionCard";
import { IconContext } from "react-icons";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

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

  const handleClick = (inspection) => {
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
            className="btn btn-warning rounded-pill fw-bold"
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
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Hive Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inspections.map((inspection) => (
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
                            onClick={() => handleClick(inspection)}
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
            </Modal>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InspectionPage;
