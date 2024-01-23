import { STATUS_CODES } from "../constants/constants.js";
import Review from "../models/reviewModel.js";

//@desc Review a user
//@route POST /api/reviews/create
//@access private
export const createReview = async (req, res, next) => {
    try {
        const { sender, receiver, content, rating, offer } = req.body;
        if (!sender || !receiver || !content || !rating || !offer) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error(
                "Must Provide sender, receiver, content, rating and offer ID"
            );
        }
        if (isNaN(rating) || rating < 0 || rating > 5) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Rating Must Be A number between 0 and 5");
        }
        const existingReview = await Review.find({ sender, offer });
        if (existingReview.length > 0) {
            res.status(STATUS_CODES.FORBIDDEN);
            throw new Error("You have already added a review to this offer");
        }
        const review = await Review.create(req.body);
        res.status(STATUS_CODES.CREATED).send(review);
    } catch (error) {
        next(error);
    }
};

//@desc Get user reviews by id
//@route GET /api/reviews/delete
//@access private
export const getReviews = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Must Provide User ID");
        }
        const reviews = await Review.find({ receiver: userId });
        res.status(STATUS_CODES.CREATED).send(reviews);
    } catch (error) {
        next(error);
    }
};

//@desc Delete my review on user reviews
//@route DELETE /api/reviews/delete
//@access private
export const deleteReview = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { reviewId } = req.body;
        if (!userId) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Must Provide User ID");
        }
        const review = await Review.findOneAndDelete({
            sender: userId,
            _id: reviewId,
        });
        res.send(review);
    } catch (error) {
        next(error);
    }
};

//@desc Update my review on user reviews
//@route PUT /api/reviews/update
//@access private
export const updateReview = async (req, res, next) => {
    try {
        const { reviewId, sender, content, rating } = req.body;
        if (!sender || !content || !rating || !reviewId) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error(
                "Must Provide sender, review ID, content and rating"
            );
        }
        if (isNaN(rating) || rating < 0 || rating > 5) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Rating Must Be A number between 0 and 5");
        }
        const review = await Review.findOneAndUpdate(
            {
                sender: userId,
                _id: reviewId,
            },
            req.body,
            { new: true }
        );
        res.send(review);
    } catch (error) {
        next(error);
    }
};

//@desc Get user reviews by name
//@route GET /api/reviews/:name
//@access private
export const getMyReviews = async (req, res, next) => {
    try {
        const { name } = req.params;
        if (!name) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Must Provide User ID");
        }
        const reviews = await Review.find().populate("receiver");
        const filteredReviews = reviews.filter((review) =>
            review.receiver.displayName.includes(name)
        );
        res.send(filteredReviews);
    } catch (error) {
        next(error);
    }
};

// //@desc Get user reviews by id
// //@route GET /api/reviews/:userId
// //@access private
// export const getMyReviews = async (req, res, next) => {
//     try {
//         const { userId } = req.params;
//         if (!userId) {
//             res.status(STATUS_CODES.VALIDATION_ERROR);
//             throw new Error("Must Provide User ID");
//         }
//         const reviews = await Review.find({ receiver: userId });
//         res.status(STATUS_CODES.CREATED).send(reviews);
//     } catch (error) {
//         next(error);
//     }
// };
