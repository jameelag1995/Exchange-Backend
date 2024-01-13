import express from "express";
import { validateToken } from "../middleware/validateTokenHandler.js";
import {
    currentUser,
    getAllUsers,
    loginUser,
    logout,
    logoutAll,
    registerUser,
    updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", validateToken, getAllUsers);
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

router.patch("/users/update", validateToken, updateUser);
router.get("/users/me", validateToken, currentUser);
router.post("/users/logoutAll", validateToken, logoutAll);
router.post("/users/logout", validateToken, logout);
export default router;
