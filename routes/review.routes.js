import express from "express";
import {
    createReview,
    deleteReview,
    getReviews,
    updateReview,
} from "../controllers/reviewController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/exchange/reviews/{userId}:
 *   get:
 *     summary: Get reviews by user ID
 *     description: Get all reviews for a specific user (requires authentication)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get reviews for
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:userId", validateToken, getReviews);

/**
 * @swagger
 * /api/v1/exchange/reviews/create:
 *   post:
 *     summary: Create a new review
 *     description: Create a new review for a user (requires authentication)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiver
 *               - content
 *               - rating
 *             properties:
 *               receiver:
 *                 type: string
 *                 description: ID of the user being reviewed
 *                 example: "507f1f77bcf86cd799439012"
 *               content:
 *                 type: string
 *                 description: Review content/comment
 *                 example: "Great trade experience! The product was exactly as described."
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating from 1 to 5 stars
 *                 example: 5
 *               offer:
 *                 type: string
 *                 description: ID of the offer this review is for (optional)
 *                 example: "507f1f77bcf86cd799439013"
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Receiver or offer not found
 *       500:
 *         description: Internal server error
 */
router.post("/create", validateToken, createReview);

/**
 * @swagger
 * /api/v1/exchange/reviews/delete:
 *   delete:
 *     summary: Delete review
 *     description: Delete a review (requires authentication, author only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewId
 *             properties:
 *               reviewId:
 *                 type: string
 *                 description: ID of the review to delete
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       400:
 *         description: Invalid review ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the author
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete", validateToken, deleteReview);

/**
 * @swagger
 * /api/v1/exchange/reviews/update:
 *   put:
 *     summary: Update review
 *     description: Update a review (requires authentication, author only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewId
 *             properties:
 *               reviewId:
 *                 type: string
 *                 description: ID of the review to update
 *                 example: "507f1f77bcf86cd799439011"
 *               content:
 *                 type: string
 *                 description: Updated review content
 *                 example: "Updated review content - still a great experience!"
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Updated rating from 1 to 5 stars
 *                 example: 4
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the author
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */
router.put("/update", validateToken, updateReview);

// 
export default router;
