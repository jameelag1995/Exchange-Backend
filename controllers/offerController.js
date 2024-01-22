import { STATUS_CODES } from "../constants/constants.js";
import Offer from "../models/offerModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

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
        if (completed !== undefined) {
            if (completed) {
                // const soldSenderProducts = senderProducts.map((prod) => {
                //     return { ...prod, currentOwner: offer.receiver._id };
                // });
                // const soldReceiverProducts = receiverProducts.map((prod) => {
                //     return { ...prod, currentOwner: offer.receiver._id };
                // });

                for (let prod of receiverProducts) {
                    const newProduct = await Product.findById(prod._id);
                    newProduct.currentOwner = offer.sender._id;
                    await newProduct.save();
                }

                for (let prod of senderProducts) {
                    const newProduct = await Product.findById(prod._id);
                    newProduct.currentOwner = offer.receiver._id;
                    await newProduct.save();
                }

                // const sender = await User.findById(offer.sender._id);
                // const newSenderProducts = sender.products.filter(
                //     (prod) => !senderProducts.includes(prod)
                // );
                // sender.products = newSenderProducts.concat(
                //     updatedOwnerOfReceiverProducts
                // );
                // await sender.save();
                // const receiver = await User.findById(offer.receiver._id);
                // const newReceiverProducts = receiver.products.filter(
                //     (prod) => !receiverProducts.includes(prod)
                // );
                // receiver.products = newReceiverProducts.concat(
                //     updatedOwnerOfSenderProducts
                // );
                // await receiver.save();
            }
        }
        res.send(offer);
    } catch (error) {
        next(error);
    }
};

//@desc get my offers
//@route GET /api/offers/my-offers
//@access private
export const getMyOffers = async (req, res, next) => {
    try {
        const offers = await Offer.find({
            $or: [{ sender: req.user._id }, { receiver: req.user._id }],
        })
            .populate("sender receiver")
            .sort({ updatedAt: -1 });

        if (!offers) {
            res.status(STATUS_CODES.NOT_FOUND);
            throw new Error("No Such Offer");
        }
        res.send(offers);
    } catch (error) {
        next(error);
    }
};
