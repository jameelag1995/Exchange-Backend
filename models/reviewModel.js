import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - sender
 *         - receiver
 *         - content
 *         - rating
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the review
 *           example: "507f1f77bcf86cd799439011"
 *         sender:
 *           type: string
 *           description: ID of the user writing the review
 *           example: "507f1f77bcf86cd799439012"
 *         receiver:
 *           type: string
 *           description: ID of the user being reviewed
 *           example: "507f1f77bcf86cd799439013"
 *         content:
 *           type: string
 *           description: The review content/comment
 *           example: "Great trade experience! The product was exactly as described."
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Rating from 1 to 5 stars
 *           example: 5
 *         offer:
 *           type: string
 *           description: ID of the offer this review is for
 *           example: "507f1f77bcf86cd799439014"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the review was created
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the review was last updated
 *           example: "2023-01-01T00:00:00.000Z"
 */

const reviewSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        content: {
            type: String,
            required: [true, "Must provide review content"],
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, "Must provide trade rating"],
        },
        offer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Offers",
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Reviews", reviewSchema);

export default Review;
