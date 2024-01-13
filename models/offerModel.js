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
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
        },
    },
    {
        timestamps: true,
    }
);

const Offer = mongoose.model("Offers", offerSchema);

export default Offer;
