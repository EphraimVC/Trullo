import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const ConnectDB = async (): Promise<void> => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not set or missing");
        }
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "trullo",
        });
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
};
