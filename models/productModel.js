import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - type
 *         - category
 *         - subCategory
 *         - canBeTradedFor
 *         - title
 *         - description
 *         - estimatedValue
 *         - location
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *           example: "507f1f77bcf86cd799439011"
 *         type:
 *           type: string
 *           enum: [Goods, Service]
 *           description: Type of product (Goods or Service)
 *           example: "Goods"
 *         category:
 *           type: string
 *           description: Main category of the product
 *           example: "Electronics"
 *         subCategory:
 *           type: string
 *           description: Sub-category of the product
 *           example: "Smartphones"
 *         canBeTradedFor:
 *           type: array
 *           description: Array of items this product can be traded for
 *           items:
 *             type: string
 *           example: ["Electronics", "Books", "Clothing"]
 *         title:
 *           type: string
 *           description: Title of the product
 *           example: "iPhone 12 Pro"
 *         description:
 *           type: string
 *           description: Detailed description of the product
 *           example: "Excellent condition iPhone 12 Pro, 128GB, Space Gray"
 *         estimatedValue:
 *           type: number
 *           minimum: 0
 *           description: Estimated value of the product
 *           example: 800
 *         color:
 *           type: string
 *           description: Color of the product
 *           example: "Space Gray"
 *         pictures:
 *           type: array
 *           description: Array of picture URLs
 *           items:
 *             type: string
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         location:
 *           type: string
 *           description: Location of the product
 *           example: "New York, NY"
 *         currentOwner:
 *           type: string
 *           description: ID of the current owner
 *           example: "507f1f77bcf86cd799439012"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was created
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was last updated
 *           example: "2023-01-01T00:00:00.000Z"
 */

const productSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ["Goods", "Service"],
            default: "Goods",
        },
        category: {
            type: String,
            default: "other",
            required: true,
        },
        subCategory: {
            type: String,
            default: "other",
            required: true,
        },
        canBeTradedFor: {
            type: [String],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        estimatedValue: {
            type: Number,
            min: [0, "Estimated Value Must Be a Positive Number"],
            required: true,
        },
        color: {
            type: String,
        },
        pictures: {
            type: [String],
        },
        location: {
            type: String,
            required: true,
        },
        currentOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Products", productSchema);

export default Product;
