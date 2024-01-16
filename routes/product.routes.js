import express from "express";
import {
    createProduct,
    getProduct,
    removeProduct,
    updateProduct,
} from "../controllers/productController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.post("/products/create", validateToken, createProduct);
router.get("/products/:productId", validateToken, getProduct);
router.delete("/products/:productId", validateToken, removeProduct);
router.put("/products/:productId", validateToken, updateProduct);
export default router;
