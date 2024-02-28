// import { Card } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

// const HiveCard = () => {
//   const textStyle = { color: "#ffcb05" }; // Style for text color

//   return (
//     <div className="col gy-4">
//       <div className="container px-2 pop" style={{ maxWidth: "500px" }}>
//         <Card className="rounded-5 border-3" style={{ borderColor: "#ffcb05" }}>
//           <Card.Header
//             className="fs-4 fw-bold text-center pb-0"
//             style={textStyle}
//           >
//             Hive #
//           </Card.Header>
//           <Card.Header
//             className="fs-6 fw-bold text-center pb-0"
//             style={textStyle}
//           >
//             1
//           </Card.Header>
//           <Card.Body
//             className="pb-2 pt-1 mt-0 m-1 mb-2 d-flex fw-semibold fs-5 justify-content-between align-items-baseline"
//             style={textStyle}
//           >
//             <div>Added:</div>
//             <div>2/10/24</div>
//           </Card.Body>
//           <Card.Text style={textStyle}>100%</Card.Text>
//           <div className="d-flex justify-content-between mx-3 mb-2">
//             <Button className="rounded-pill" variant="danger">
//               DELETE
//             </Button>{" "}
//             <Button className="rounded-pill" variant="warning">
//               EDIT
//             </Button>{" "}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default HiveCard;

import React from "react";
import { Card, Button } from "react-bootstrap";

const HiveCard = ({ hive }) => {
  const { hiveNumber, breed, hiveStrength, hiveDate } = hive;
  const textStyle = { color: "#ffcb05" };

  return (
    <div className="col g-4">
      <div className="container px-2 pop" style={{ maxWidth: "500px" }}>
        <Card className="rounded-5 border-3" style={{ borderColor: "#ffcb05" }}>
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
            <div>{hiveDate}</div>
            <Card.Text style={textStyle}>{hiveStrength}%</Card.Text>
          </Card.Body>
          <div className="d-flex justify-content-between mx-3 mb-2">
            <Button className="rounded-pill" variant="outline-danger">
              DELETE
            </Button>{" "}
            <Button className="rounded-pill" variant="outline-warning">
              EDIT
            </Button>{" "}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HiveCard;
