import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { Table, Modal, Button } from "react-bootstrap";
import InspectionCard from "./InspectionCard";

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

  const handleShowModal = (inspection) => {
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
        <thead className="fs-5">
          <tr>
            <th>Date</th>
            <th>Inspection</th>
            <th>Feeding</th>
            <th>Treatment</th>
            <th>Info</th>
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
                <IconContext.Provider value={{ color: "fccb05", size: "2em" }}>
                  <div className="darken-on-hover">
                    <IoInformationCircleOutline
                      onClick={() => handleShowModal(inspection)}
                    />
                  </div>
                </IconContext.Provider>
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
      </Modal>
    </div>
  );
};

export default HiveTable;
