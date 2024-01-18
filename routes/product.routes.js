import express from "express";
import {
    createProduct,
    getAllMyProducts,
    getAllProducts,
    getProduct,
    removeProduct,
    updateProduct,
} from "../controllers/productController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.post("/create", validateToken, createProduct);
router.get("/", validateToken, getAllProducts);
router.get("/myProducts", validateToken, getAllMyProducts);
router.get("/:productId", validateToken, getProduct);
router.delete("/:productId", validateToken, removeProduct);
router.put("/:productId", validateToken, updateProduct);
export default router;
