// ImageDisplay.jsx
const ImageDisplay = ({ imageUrl, maxWidth, maxHeight }) => {
  return (
    <img
      src={imageUrl}
      alt="Hive Image"
      style={{ maxWidth: maxWidth || "120px", maxHeight: maxHeight || "120px" }}
    />
  );
};

export default ImageDisplay;
