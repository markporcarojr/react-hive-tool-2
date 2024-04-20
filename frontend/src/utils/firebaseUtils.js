import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { v4 } from "uuid";

const uploadImageToStorage = async (imageFile, path) => {
    const storageRef = ref(storage, path + imageFile.name + v4());
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
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
