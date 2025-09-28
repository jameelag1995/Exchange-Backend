import mongoose from "mongoose";
import logger from "../middleware/logger.js";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        logger.info('Database connected successfully', {
            host: connect.connection.host,
            name: connect.connection.name,
            readyState: connect.connection.readyState
        });
    } catch (error) {
        logger.error('Database connection failed', {
            error: error.message,
            stack: error.stack
        });
        process.exit(1);
    }
};
