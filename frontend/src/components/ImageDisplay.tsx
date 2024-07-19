// ImageDisplay.jsx
const ImageDisplay = ({ imageUrl, maxWidth, maxHeight, alt }) => {
  return (
    <img
      src={imageUrl}
      style={{ maxWidth: maxWidth || "120px", maxHeight: maxHeight || "120px" }}
      alt={alt}
    />
  );
};

export default ImageDisplay;
