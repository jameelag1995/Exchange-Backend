import express from "express";
import {
    createReview,
    deleteReview,
    getReviews,
    updateReview,
} from "../controllers/reviewController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

// Get Reviews By User ID
router.get("/:userId", validateToken, getReviews);

// Create Review
router.post("/create", validateToken, createReview);

// Delete Review
router.delete("/delete", validateToken, deleteReview);

// Update Review
router.put("/update", validateToken, updateReview);

// 
export default router;
