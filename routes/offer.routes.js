import express from "express";
import {
    createOffer,
    getMyOffers,
    getOffer,
    updateOffer,
} from "../controllers/offerController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/exchange/offers/create:
 *   post:
 *     summary: Create a new offer
 *     description: Create a new trade offer (requires authentication)
 *     tags: [Offers]
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
 *               - receiverProducts
 *               - senderProducts
 *             properties:
 *               receiver:
 *                 type: string
 *                 description: ID of the user receiving the offer
 *                 example: "507f1f77bcf86cd799439012"
 *               receiverProducts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of product IDs from the receiver
 *                 example: ["507f1f77bcf86cd799439013", "507f1f77bcf86cd799439014"]
 *               senderProducts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of product IDs from the sender
 *                 example: ["507f1f77bcf86cd799439015", "507f1f77bcf86cd799439016"]
 *               conversation:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sender:
 *                       type: string
 *                       description: ID of the message sender
 *                     content:
 *                       type: string
 *                       description: Message content
 *                 description: Initial conversation message (optional)
 *                 example: [
 *                   {
 *                     "sender": "507f1f77bcf86cd799439011",
 *                     "content": "Hi, I'm interested in trading for your iPhone"
 *                   }
 *                 ]
 *     responses:
 *       201:
 *         description: Offer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Receiver or products not found
 *       500:
 *         description: Internal server error
 */
router.post("/create", validateToken, createOffer);

/**
 * @swagger
 * /api/v1/exchange/offers/my-offers:
 *   get:
 *     summary: Get my offers
 *     description: Get all offers where the current user is sender or receiver (requires authentication)
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's offers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Offer'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/my-offers", validateToken, getMyOffers);

/**
 * @swagger
 * /api/v1/exchange/offers/{offerId}:
 *   get:
 *     summary: Get offer by ID
 *     description: Get a specific offer by its ID (requires authentication)
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Offer ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Offer retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       400:
 *         description: Invalid offer ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Offer not found
 *       500:
 *         description: Internal server error
 */
router.get("/:offerId", validateToken, getOffer);

/**
 * @swagger
 * /api/v1/exchange/offers/{offerId}:
 *   patch:
 *     summary: Update offer
 *     description: Update an offer by ID (requires authentication, participant only)
 *     tags: [Offers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Offer ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Accepted, Rejected]
 *                 description: New status for the current user
 *                 example: "Accepted"
 *               conversation:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sender:
 *                       type: string
 *                       description: ID of the message sender
 *                     content:
 *                       type: string
 *                       description: Message content
 *                 description: New conversation message to add
 *                 example: [
 *                   {
 *                     "sender": "507f1f77bcf86cd799439012",
 *                     "content": "I accept your offer!"
 *                   }
 *                 ]
 *               completed:
 *                 type: boolean
 *                 description: Mark the trade as completed
 *                 example: true
 *     responses:
 *       200:
 *         description: Offer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a participant
 *       404:
 *         description: Offer not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:offerId", validateToken, updateOffer);

export default router;
