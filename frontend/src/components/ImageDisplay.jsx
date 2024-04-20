import { storage } from "./firebaseConfig";

const ImageDisplay = ({ imageUrl }) => {
  return (
    <div>
      <img src={imageUrl} alt="Uploaded" />
    </div>
  );
};

export default ImageDisplay;
