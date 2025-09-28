import mongoose from "mongoose";
import jwt from "jsonwebtoken";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - displayName
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *           example: "507f1f77bcf86cd799439011"
 *         displayName:
 *           type: string
 *           description: The user's display name
 *           minLength: 2
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *           example: "john@example.com"
 *         password:
 *           type: string
 *           description: The user's hashed password
 *           minLength: 8
 *         profilePicture:
 *           type: string
 *           description: URL to the user's profile picture
 *           example: "https://example.com/profile.jpg"
 *         reviews:
 *           type: array
 *           description: Array of review IDs associated with the user
 *           items:
 *             type: string
 *           example: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
 *         transactions:
 *           type: array
 *           description: Array of transaction IDs associated with the user
 *           items:
 *             type: string
 *           example: ["507f1f77bcf86cd799439014", "507f1f77bcf86cd799439015"]
 *         tokens:
 *           type: array
 *           description: Array of active JWT tokens for the user
 *           items:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT token string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 *           example: "2023-01-01T00:00:00.000Z"
 */

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
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transaction",
            },
        ],
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateAccessToken = async function () {
    const currUser = this;
    const token = jwt.sign(
        {
            _id: currUser._id.toString(),
        },
        process.env.ACCESS_TOKEN_SECRET
    );

    currUser.tokens = currUser.tokens.concat({ token });
    await currUser.save();
    return token;
};

const User = mongoose.model("Users", userSchema);

export default User;
