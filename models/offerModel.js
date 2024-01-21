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
