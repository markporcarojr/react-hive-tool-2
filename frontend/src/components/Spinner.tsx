// import Spinner from "react-bootstrap/Spinner";

// const LoadSpinner = () => {
//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <Spinner
//         animation="border"
//         variant="warning"
//         role="status"
//         style={{ width: "10vw", height: "10vw" }}
//       >
//         <span className="visually-hidden">Loading...</span>
//       </Spinner>
//     </div>
//   );
// };

// export default LoadSpinner;

import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/animations/honeyBee.json";

const LoadSpinner = () => {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
};

export default LoadSpinner;
