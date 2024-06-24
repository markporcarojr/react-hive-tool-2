import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

export default connectDB;
