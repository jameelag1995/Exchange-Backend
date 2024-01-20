import express from "express";
import {
    createProduct,
    getAllMyProducts,
    getAllProducts,
    getAllProductsByUserId,
    getProduct,
    removeProduct,
    searchProducts,
    updateProduct,
} from "../controllers/productController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.get("/all-products/", validateToken, getAllProducts);
router.get("/search/by", validateToken, searchProducts);
router.post("/create", validateToken, createProduct);
router.get("/myProducts", validateToken, getAllMyProducts);
router.get("/:productId", validateToken, getProduct);
router.get("/by-userId/:userId", validateToken, getAllProductsByUserId);
router.delete("/:productId", validateToken, removeProduct);
router.put("/:productId", validateToken, updateProduct);
export default router;
