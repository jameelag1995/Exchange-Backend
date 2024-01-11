import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        displayName: {
            type: String,
            minlength: [2, "Display Name must be at least 2 characters"],
            required: [true, "Must provide display name"],
        },
        email: {
            type: String,
            unique: [true, "This email is already in use"],
            required: [true, "Must provide email"],
            validate: {
                validator: function (value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value);
                },
                message: "Invalid email address",
            },
        },
        password: {
            type: String,
            required: [true, "Must provide password"],
            minlength: 8,
            validate: {
                validator: function (value) {
                    if (value.length < 8) {
                        throw new Error(
                            "Password must be at least 8 characters long"
                        );
                    }
                    return value;
                },
            },
        },
        profilePicture: {
            type: String,
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reviews",
            },
        ],
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
        ],
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transaction",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("Users", userSchema);

export default User;
