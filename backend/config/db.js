import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db connected");

    } catch {
        console.log("database connection failed.");
    }
}

export default connectDB;