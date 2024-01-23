import User from "../models/userModel.js";
import { STATUS_CODES } from "../constants/constants.js";
import bcrypt from "bcrypt";

// @desc
// @route
// @privacy
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        next(error);
    }
};

//@desc Register a user
//@route POST /api/users/register
//@access public
export const registerUser = async (req, res, next) => {
    try {
        const { displayName, email, password } = req.body;
        if (!displayName || !email || !password) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("All fields are mandatory!");
        }
        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("User already registered!");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            displayName,
            email,
            password: hashedPassword,
        });

        if (user) {
            const accessToken = await user.generateAccessToken();
            res.status(STATUS_CODES.CREATED).json({
                accessToken,
            });
        } else {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("User data is not valid");
        }
    } catch (error) {
        next(error);
    }
};

//@desc Login a user
//@route POST /api/users/login
//@access public
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("All fields are mandatory");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = await user.generateAccessToken();
            res.status(STATUS_CODES.OK).json({ accessToken });
        } else {
            res.status(STATUS_CODES.UNAUTHORIZED);
            throw new Error("Email or Password is not valid");
        }
    } catch (error) {
        next(error);
    }
};

//@desc Update user
//@route PATCH /api/users/update
//@access private
export const updateUser = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Must provide request body");
        }
        const user = await User.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
        }).select("-password");

        res.send(user);
    } catch (error) {
        next(error);
    }
};

//@desc Current user
//@route GET /api/users/me
//@access private
export const currentUser = async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (error) {
        next(error);
    }
};

//@desc Logout a user
//@route POST /api/users/logout
//@access private
export const logout = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter(
            (token) => token.token != req.token
        );
        await req.user.save();
        res.send("logged out");
    } catch (error) {
        next(error);
    }
};

//@desc logout a user from all
//@route POST /api/users/logoutAll
//@access private
export const logoutAll = async (req, res, next) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send("logged out from all devices");
    } catch (error) {
        next(error);
    }
};

//@desc Get a user by id
//@route GET /api/users/:id
//@access public
export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Must Provide User ID");
        }
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(STATUS_CODES.NOT_FOUND);
            throw new Error("No Such User");
        }
        res.send(user);
    } catch (error) {
        next(error);
    }
};

// //@desc Register a user
// //@route POST /api/users/register
// //@access public
// export const getAllUsers = async(req,res,next)=>{
//     try {

//     } catch (error) {
//         next(error)
//     }
// }
