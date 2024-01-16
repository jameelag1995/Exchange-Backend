import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/dbConnection.js";
import { errorHandler } from "./middleware/errorHandler.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
dotenv.config();

const app = express();

// cors middleware
app.use(cors());

// json parse middleware
app.use(express.json());

// routes
app.use("/api/v1/exchange", userRouter);
app.use("/api/v1/exchange", productRouter);

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4545;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is listening on port " + PORT);
    });
});
