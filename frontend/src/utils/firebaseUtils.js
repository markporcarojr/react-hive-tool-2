import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { v4 } from "uuid";
import imageCompression from "browser-image-compression"; // Import image compression library

const uploadImageToStorage = async (imageFile, path) => {
    try {
        // Compress the image before uploading
        const compressedImage = await imageCompression(imageFile, {
            maxSizeMB: 1, // Set maximum size in MB
            maxWidthOrHeight: 1920, // Set maximum width or height
            useWebWorker: true,
        });

        // Create a storage reference
        const storageRef = ref(storage, path + imageFile.name + v4());

        // Upload the compressed image bytes
        await uploadBytes(storageRef, compressedImage);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);

        return imageUrl;
    } catch (error) {
        console.error("Image upload error:", error);
        throw new Error("Failed to upload image.");
    }
};

const deleteImageFromStorage = async (imageUrl) => {
    try {
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
        console.log("Image deleted successfully from Firebase Storage.");

    } catch (error) {
        console.error("Error deleting image from Firebase Storage:", error);
        throw new Error("Failed to delete image from Firebase Storage.");
    }
};

export { uploadImageToStorage, deleteImageFromStorage };
