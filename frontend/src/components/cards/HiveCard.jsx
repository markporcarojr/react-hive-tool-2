// HiveCard.jsx
import { Card } from "react-bootstrap";

const HiveCard = ({ hive }) => {
  if (!hive) {
    return <div>No hive data available</div>;
  }
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
    frames,
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
                <p className="mb-1 text-nowrap">Added:</p>
                <p className="mb-1 text-nowrap">Source:</p>
                <p className="mb-1 text-nowrap">Breed:</p>
                <p className="mb-1 text-nowrap">Queen Color:</p>
                <p className="mb-1 text-nowrap">Queen Age:</p>
                <p className="mb-1 text-nowrap">Strength:</p>
                <p className="mb-1 text-nowrap">Queen Excluder:</p>
                <p className="mb-1 text-nowrap">Frames:</p>
                <p className="mb-1 text-nowrap">Super Boxes:</p>
                <p className="mb-1 text-nowrap">Brood Boxes:</p>
              </div>
              <div className="col-6 text-end">
                <p className="mb-1 ">{formattedDate || "N/A"}</p>
                <p className="mb-1 ">{hiveSource || "N/A"}</p>
                <p className="mb-1 ">{breed || "N/A"}</p>
                <p className="mb-1 ">{queenColor || "N/A"}</p>
                <p className="mb-1 ">{queenAge || "N/A"}</p>
                <p className="mb-1 ">{hiveStrength || "N/A"}%</p>
                <p className="mb-1 ">{queenExcluder || "N/A"}</p>
                <p className="mb-1 ">{frames || "10"}</p>
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
