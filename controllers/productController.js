import { STATUS_CODES } from "../constants/constants.js";
import Product from "../models/productModel.js";
import sharp from "sharp";
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

        const product = new Product(req.body);
        product.currentOwner = req.user._id;
        if (req.body.pictures) product.pictures = pictures.split(",");
        if (req.body.canBeTradedFor)
            product.canBeTradedFor = canBeTradedFor.split(",");
        await product.save();
        req.user.products.push(product);
        await req.user.save();
        res.status(STATUS_CODES.CREATED).send(product);
    } catch (error) {
        next(error);
    }
};

//@desc get all products
//@route GET /api/products
//@access private
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        next(error);
    }
};

//@desc get a product
//@route GET /api/products/:productId
//@access private
export const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Must Provide Product ID");
        }
        const product = await Product.findById(productId);
        if (!product) {
            res.status(STATUS_CODES.NOT_FOUND);
            throw new Error("No Such Product");
        }
        res.send(product);
    } catch (error) {
        next(error);
    }
};

//@desc Get all user products
//@route GET /api/products/myProducts
//@access private
export const getAllMyProducts = async (req, res, next) => {
    try {
        if (!req.user.products.length) {
            res.status(STATUS_CODES.NOT_FOUND);
            throw new Error("You didn't add any products of your own yet");
        }
        res.send(req.user.products);
    } catch (error) {
        next(error);
    }
};

//@desc Remove a product
//@route DELETE /api/products/:productId
//@access private
export const removeProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Must Provide Product ID");
        }
        const product = await Product.findById(productId);
        if (!product) {
            res.status(STATUS_CODES.NOT_FOUND);
            throw new Error("No Such Product");
        }
        console.log(product.currentOwner._id.equals(req.user._id));
        if (!product.currentOwner._id.equals(req.user._id)) {
            res.status(STATUS_CODES.FORBIDDEN);
            throw new Error("You are not authorized to remove this item");
        }
        req.user.products = req.user.products.filter(
            (product) => !product._id.equals(productId)
        );
        await req.user.save();
        const deletedProduct = await Product.deleteOne({ _id: productId });
        res.send([deletedProduct, req.user]);
    } catch (error) {
        next(error);
    }
};

//@desc Update a product
//@route PATCH /api/products/:productId
//@access private
export const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("Must Provide Product ID");
        }
        const product = await Product.findOneAndUpdate(
            {
                _id: productId,
                currentOwner: req.user._id,
            },
            {
                ...req.body,
            },
            { new: true }
        );
        if (!product) {
            res.status(STATUS_CODES.NOT_FOUND);
            throw new Error("No Such Product or Not Authorized ");
        }
        if (req.body.pictures) {
            product.pictures = req.body?.pictures.split(",");
        }
        console.log(req.body.canBeTradedFor);
        if (req.body.canBeTradedFor) {
            product.canBeTradedFor = req.body?.canBeTradedFor.split(",");
            console.log(product.canBeTradedFor);
        }

        req.user.save();
        res.send({ product, user: req.user });
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
