import mongoose from "mongoose";

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
        description: {
            type: String,
        },
        offeredProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
        ],
        desiredProduct: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Offer = mongoose.model("Offers", offerSchema);

export default Offer;
