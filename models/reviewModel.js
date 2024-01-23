import mongoose from "mongoose";

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
