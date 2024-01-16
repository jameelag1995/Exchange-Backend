import { STATUS_CODES } from "../constants/constants.js";
import Product from "../models/productModel.js";

//@desc Create a product
//@route POST /api/products/create
//@access private
export const createProduct = async (req, res, next) => {
    try {
        const {
            type,
            category,
            canBeTradedFor,
            title,
            description,
            estimatedValue,
            color,
            pictures,
        } = req.body;
        if (!canBeTradedFor || !title || !description || !estimatedValue) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error(
                "Must include title, description, estimated value and items that can be traded for"
            );
        }
        const product = await Product.create(req.body);
        product.currentOwner = req.user._id;
        await product.save();
        req.user.products.push(product);
        await req.user.save();
        res.status(STATUS_CODES.CREATED).send(product);
    } catch (error) {
        next(error);
    }
};

// //@desc Create a product
// //@route POST /api/products/create
// //@access private
// export const createProduct = async(req,res,next)=>{
//     try {

//     } catch (error) {
//         next(error)
//     }
// }
