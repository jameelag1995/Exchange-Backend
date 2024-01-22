import mongoose from "mongoose";

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
