import express from "express";
import { validateToken } from "../middleware/validateTokenHandler.js";
import {
    currentUser,
    getAllUsers,
    getUserById,
    loginUser,
    logout,
    logoutAll,
    registerUser,
    updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", validateToken, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/update", validateToken, updateUser);
router.get("/me", validateToken, currentUser);
router.get("/:userId", validateToken, getUserById);
router.put("/logoutAll", validateToken, logoutAll);
router.put("/logout", validateToken, logout);
export default router;
