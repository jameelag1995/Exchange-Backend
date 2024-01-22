import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        sentProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
        ],
        receivedProducts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
        ],
        status: {
            type: String,
            enum: ["Accepted", "Rejected"],
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transactions", transactionSchema);

export default Transaction;
