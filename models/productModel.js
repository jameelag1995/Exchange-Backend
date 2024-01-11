import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    if (value !== "Goods" || value !== "Services") {
                        throw new Error(
                            "Product type can be goods or services"
                        );
                    }
                    return value;
                },
            },
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
