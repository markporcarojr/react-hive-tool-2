import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { v4 } from "uuid";
import imageCompression from "browser-image-compression";


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

const uploadUserImageToStorage = async (imageFile, userId) => {
    try {
        // Compress the image before uploading
        const compressedImage = await imageCompression(imageFile, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        });

        // Create a storage reference with user ID in the path
        const storageRef = ref(storage, `user-images/${userId}/${imageFile.name + v4()}`);

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



const deleteFolderFromStorage = async (folderPath) => {
    try {
        const folderRef = ref(storage, folderPath);
        const listResult = await listAll(folderRef);

        const deletePromises = listResult.items.map((itemRef) => deleteObject(itemRef));

        await Promise.all(deletePromises);
        console.log(`Deleted all files in the folder: ${folderPath}`);
    } catch (error) {
        console.error("Error deleting folder from Firebase Storage:", error);
        throw new Error("Failed to delete folder from Firebase Storage.");
    }
};



export { uploadImageToStorage, deleteImageFromStorage, uploadUserImageToStorage, deleteFolderFromStorage, };
