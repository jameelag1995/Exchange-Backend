import express from "express";
import {
    createOffer,
    getMyOffers,
    getOffer,
    updateOffer,
} from "../controllers/offerController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

// create new offer
router.post("/create", validateToken, createOffer);

// get my offers
router.get("/my-offers", validateToken, getMyOffers);

// get offer by id
router.get("/:offerId", validateToken, getOffer);

// update offer by id
router.patch("/:offerId", validateToken, updateOffer);

export default router;
