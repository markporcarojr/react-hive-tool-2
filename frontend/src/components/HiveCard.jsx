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
              <div className="col-md-6">
                <p className="mb-1">Added:</p>
                <p className="mb-1 ">Source:</p>
                <p className="mb-1 ">Queen Color:</p>
                <p className="mb-1 ">Queen Age:</p>
                <p className="mb-1 ">Strength:</p>
                <p className="mb-1 ">Breed:</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1 ">{formattedDate}</p>
                <p className="mb-1 ">{hiveSource}</p>
                <p className="mb-1 ">{queenColor}</p>
                <p className="mb-1 ">{queenAge}</p>
                <p className="mb-1 ">{hiveStrength}%</p>
                <p className="mb-1 ">{breed}</p>
              </div>
            </div>
            <hr className="border-bottom" />
          </Card.Body>
          <div className="d-flex justify-content-between mx-3 mb-2">
            <Link
              to={`/hives/delete/${hive._id}`}
              className="btn btn-outline-danger rounded-pill"
            >
              DELETE
            </Link>

            <Link
              to={`/hives/edit/${hive._id}`}
              className="btn btn-outline-warning rounded-pill"
            >
              EDIT
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HiveCard;
