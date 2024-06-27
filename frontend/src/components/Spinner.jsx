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

import Lottie from "react-lottie";
import animationData from "../assets/animations/honeyBee.json";

const LoadSpinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default LoadSpinner;
