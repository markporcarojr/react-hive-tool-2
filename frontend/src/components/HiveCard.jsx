// HiveCard.jsx
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Inside your component...

const HiveCard = ({ hive }) => {
  const { hiveNumber, breed, hiveStrength, hiveDate, userId } = hive;
  const textStyle = { color: "#ffcb05" };
  const utcDate = new Date(hiveDate);
  const options = { timeZone: "UTC" };
  const formattedDate = utcDate.toLocaleDateString("en-US", options);

  return (
    <div className={`col g-4 `}>
      <div className="container px-2 pop " style={{ maxWidth: "500px" }}>
        <Card
          className={`rounded-5 border-3 ${
            hiveStrength === 0 ? "bg-danger" : "bg-card"
          }`}
          style={{ borderColor: "#ffcb05" }}
        >
          <Card.Header
            className="fs-4 fw-bold text-center pb-0 mb-2"
            style={textStyle}
          >
            Hive #{hiveNumber}
          </Card.Header>
          <Card.Text className="fs-6 text-center mb-2s" style={textStyle}>
            {breed}
          </Card.Text>
          <Card.Body
            className="pb-2 pt-1 mt-0 m-1 mb-2 d-flex fw-semibold fs-5 justify-content-between align-items-baseline"
            style={textStyle}
          >
            <div>Added: </div>
            <div>{formattedDate}</div>
            <Card.Text style={textStyle}>{hiveStrength}％</Card.Text>
          </Card.Body>
          <div className="d-flex justify-content-between mx-3 mb-2">
            <Link
              to={`/hives/delete/${hive._id}`}
              className="btn btn-outline-danger rounded-pill"
            >
              DELETE
            </Link>
            <Link
              to={`/hives/data/${hive._id}`}
              className="btn btn-outline-success rounded-pill"
            >
              INFO
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
