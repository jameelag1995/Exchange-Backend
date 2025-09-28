import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Offer:
 *       type: object
 *       required:
 *         - sender
 *         - receiver
 *         - receiverProducts
 *         - senderProducts
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the offer
 *           example: "507f1f77bcf86cd799439011"
 *         sender:
 *           type: string
 *           description: ID of the user making the offer
 *           example: "507f1f77bcf86cd799439012"
 *         receiver:
 *           type: string
 *           description: ID of the user receiving the offer
 *           example: "507f1f77bcf86cd799439013"
 *         conversation:
 *           type: array
 *           description: Array of conversation messages
 *           items:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *                 description: ID of the message sender
 *               content:
 *                 type: string
 *                 description: Message content
 *           example: [
 *             {
 *               "sender": "507f1f77bcf86cd799439012",
 *               "content": "Hi, I'm interested in trading for your iPhone"
 *             }
 *           ]
 *         receiverProducts:
 *           type: array
 *           description: Array of product IDs from the receiver
 *           items:
 *             type: string
 *           example: ["507f1f77bcf86cd799439014", "507f1f77bcf86cd799439015"]
 *         senderProducts:
 *           type: array
 *           description: Array of product IDs from the sender
 *           items:
 *             type: string
 *           example: ["507f1f77bcf86cd799439016", "507f1f77bcf86cd799439017"]
 *         status:
 *           type: array
 *           description: Array of status updates from each user
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *               status:
 *                 type: string
 *                 enum: [Pending, Accepted, Rejected]
 *                 description: Status of the offer from this user's perspective
 *           example: [
 *             {
 *               "userId": "507f1f77bcf86cd799439012",
 *               "status": "Pending"
 *             },
 *             {
 *               "userId": "507f1f77bcf86cd799439013",
 *               "status": "Accepted"
 *             }
 *           ]
 *         completed:
 *           type: boolean
 *           description: Whether the trade has been completed
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the offer was created
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the offer was last updated
 *           example: "2023-01-01T00:00:00.000Z"
 */

const offerSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        conversation: [
            {
                sender: { type: String },
                content: { type: String },
            },
        ],
        receiverProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
        ],
        senderProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
        ],
        status: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Users",
                },
                status: {
                    type: String,
                    enum: ["Pending", "Accepted", "Rejected"],
                    default: "Pending",
                },
            },
        ],
        completed: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

const Offer = mongoose.model("Offers", offerSchema);

export default Offer;
