// HiveCard.jsx
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

const HiveCard = ({ hive }) => {
  const {
    hiveNumber,
    breed,
    hiveStrength,
    hiveDate,
    hiveSource,
    queenColor,
    queenAge,
    queenExcluder,
    superBoxes,
    broodBoxes,
  } = hive;
  const textStyle = { color: "#ffcb05" };
  const utcDate = new Date(hiveDate);
  const options = { timeZone: "UTC" };
  const formattedDate = utcDate.toLocaleDateString("en-US", options);

  return (
    <div className={`col g-4 `}>
      <div className="container px-2" style={{ maxWidth: "500px" }}>
        <Card
          className={`${hiveStrength === 0 ? "bg-danger" : "bg-card"}`}
          // style={{ borderColor: "#ffcb05" }}
        >
          <Card.Header
            className="fs-4 fw-bold text-center pb-0 mb-3"
            style={textStyle}
          >
            Hive #{hiveNumber}
          </Card.Header>

          <Card.Body
            className="pb-2 pt-1 mt-0 m-1 mb-2 fw-semibold fs-5"
            style={textStyle}
          >
            <div className="row">
              <div className="col-6">
                <p className="mb-1">Added:</p>
                <p className="mb-1 ">Source:</p>
                <p className="mb-1 ">Breed:</p>
                <p className="mb-1 ">Queen Color:</p>
                <p className="mb-1 ">Queen Age:</p>
                <p className="mb-1 ">Strength:</p>
                <p className="mb-1 ">Queen Excluder:</p>
                <p className="mb-1 ">Super Boxes:</p>
                <p className="mb-1 ">Brood Boxes:</p>
              </div>
              <div className="col-6 text-end">
                <p className="mb-1 ">{formattedDate || "N/A"}</p>
                <p className="mb-1 ">{hiveSource || "N/A"}</p>
                <p className="mb-1 ">{breed || "N/A"}</p>
                <p className="mb-1 ">{queenColor || "N/A"}</p>
                <p className="mb-1 ">{queenAge || "N/A"}</p>
                <p className="mb-1 ">{hiveStrength || "N/A"}%</p>
                <p className="mb-1 ">{queenExcluder || "N/A"}</p>
                <p className="mb-1 ">{superBoxes || "N/A"}</p>
                <p className="mb-1 ">{broodBoxes || "N/A"}</p>
              </div>
            </div>
            <hr className="border-bottom" />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HiveCard;
