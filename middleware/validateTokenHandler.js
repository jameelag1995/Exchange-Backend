import jwt from "jsonwebtoken";
import { STATUS_CODES } from "../constants/constants.js";

export const validateToken = async (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        res.status(STATUS_CODES.UNAUTHORIZED);
                        throw new Error("User is not authorized");
                    }
                    req.user = decoded.user;
                    next();
                }
            );

            if (!token) {
                res.status(STATUS_CODES.UNAUTHORIZED);
                throw new Error("User is not Authorized or token is missing");
            }
        }
    } catch (error) {
        next(error);
    }
};
