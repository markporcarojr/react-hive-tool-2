// CustomModal.js
import { Modal, Button } from "react-bootstrap";
import ImageDisplay from "./ImageDisplay";
import HiveCard from "./HiveCard"; // Import your card components
import InspectionCard from "./InspectionCard";
import HarvestCard from "./HarvestCard";
import SwarmCard from "./SwarmCard";
import InventoryCard from "./InventoryCard";

const CustomModal = ({ show, onHide, selectedItem, cardType }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <div style={{ borderColor: "#ffcb05" }} className="modal-border bg-card">
        <Modal.Header className="d-flex justify-content-around">
          <Modal.Title className="text-michgold fs-3 fw-bold">
            {cardType === "hive" && (
              <ImageDisplay
                imageUrl={selectedItem?.hiveImage}
                maxHeight={"400px"}
                maxWidth={"400px"}
                style={{
                  objectFit: "scale-down",
                }}
              />
            )}
            {cardType === "inspection" && (
              <ImageDisplay
                imageUrl={selectedItem?.inspectionImage}
                maxHeight={"400px"}
                maxWidth={"400px"}
                style={{
                  objectFit: "scale-down",
                }}
              />
            )}
            {cardType === "swarm" && (
              <ImageDisplay
                imageUrl={selectedItem?.swarmImage}
                maxHeight={"400px"}
                maxWidth={"400px"}
                style={{
                  objectFit: "scale-down",
                }}
              />
            )}
            {cardType === "harvest" && "Harvest Details"}
            {cardType === "inventory" && "Inventory Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-michgold rounded-5 border-3 bg-card">
          {cardType === "harvest" && <HarvestCard harvest={selectedItem} />}
          {cardType === "hive" && <HiveCard hive={selectedItem} />}
          {cardType === "swarm" && <SwarmCard swarm={selectedItem} />}
          {cardType === "inspection" && (
            <InspectionCard inspection={selectedItem} />
          )}
          {cardType === "inventory" && (
            <InventoryCard inventory={selectedItem} />
          )}
          {/* Add other card types as needed */}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <div className="d-grid gap-2">
            <Button variant="secondary" size="lg" onClick={onHide}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default CustomModal;
