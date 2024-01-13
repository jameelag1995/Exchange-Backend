import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ["Goods", "Services"],
            default: "Goods",
        },
        category: {
            type: String,
            default: "other",
            required: true,
        },
        canBeTradedFor: {
            type: [String],
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
        },
        pictures: {
            type: [String],
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
