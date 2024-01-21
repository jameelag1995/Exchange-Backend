import { STATUS_CODES } from "../constants/constants.js";
import Offer from "../models/offerModel.js";

//@desc get an offer by id
//@route GET /api/offers/:offerId
//@access private
export const getOffer = async (req, res, next) => {
    try {
        const offerId = req.params.offerId;
        if (!offerId) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Must Provide Offer ID");
        }
        const offer = await Offer.findById(offerId).populate(
            "sender receiver receiverProducts senderProducts"
        );
        if (!offer) {
            res.status(STATUS_CODES.NOT_FOUND);
            throw new Error("No Such Offer");
        }
        res.send(offer);
    } catch (error) {
        next(error);
    }
};

//@desc create a new offer
//@route POST /api/offers/create
//@access private
export const createOffer = async (req, res, next) => {
    try {
        const { sender, receiver, product, status } = req.body;
        if (!sender || !receiver || !product || !status) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error(
                "Offer must contain sender id, receiver id , product Id and status"
            );
        }
        const receiverProducts = [product];
        const offer = await Offer.create({
            sender,
            receiver,
            receiverProducts,
            status,
        });

        res.send(offer);
    } catch (error) {
        next(error);
    }
};

//@desc Update offer
//@route PATCH /api/offers/:offerId
//@access private
export const updateOffer = async (req, res, next) => {
    try {
        const {
            senderProducts,
            receiverProducts,
            conversation,
            status,
            completed,
        } = req.body;
        const offerId = req.params.offerId;
        if (!senderProducts || !receiverProducts || !status) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error(
                "Offer must include sender and receiver products of the offer with  status"
            );
        }


        const offer = await Offer.findByIdAndUpdate(offerId, req.body, {
            new: true,
        }).populate("sender receiver receiverProducts senderProducts");
        if (!offer) {
            res.send(STATUS_CODES.NOT_FOUND);
            throw new Error("No Such Offer");
        }
        if(completed !== undefined){
            
        }
        res.send(offer);
    } catch (error) {
        next(error);
    }
};

//@desc get an my offers
//@route GET /api/offers/:offerId
//@access private
export const getMyOffers = async (req, res, next) => {
    try {
        const offers = await Offer.find({
            $or: [{ sender: req.user._id }, { receiver: req.user._id }],
        }).populate("sender receiver");

        if (!offers) {
            res.status(STATUS_CODES.NOT_FOUND);
            throw new Error("No Such Offer");
        }
        res.send(offers);
    } catch (error) {
        next(error);
    }
};
