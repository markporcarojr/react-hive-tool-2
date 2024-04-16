import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Table, Modal, Button } from "react-bootstrap";
import InspectionCard from "./InspectionCard";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const utcDate = new Date(dateString);
  const options = { timeZone: "UTC" };
  return utcDate.toLocaleDateString("en-US", options);
};

const HiveTable = ({ userInspections }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);

  const hiveNumber =
    userInspections.length > 0 ? userInspections[0].hiveNumber : null;

  const handleClick = (inspection) => {
    setSelectedInspection(inspection);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInspection(null);
  };

  return (
    <div className="text-michgold text-center m-3">
      <h1>Hive #{hiveNumber}</h1>
      <Table
        bordered
        striped
        hover
        responsive
        variant="dark"
        className="text-michgold"
      >
        <thead className="fs-4 fw-bold text-center">
          <tr>
            <th>Date</th>
            <th>Inspection</th>
            <th>Feeding</th>
            <th>Treatment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userInspections.map((inspection, index) => (
            <tr key={index}>
              <td>{formatDate(inspection.inspectionDate)}</td>
              <td>{inspection.temperament || "N/A"}</td>
              <td>{inspection.feeding || "N/A"}</td>
              <td>{inspection.treatments || "N/A"}</td>
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
      {/* Modal to display detailed inspection information */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-90w"
      >
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
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default HiveTable;
