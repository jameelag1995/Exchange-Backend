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
            subCategory,
            canBeTradedFor,
            title,
            description,
            estimatedValue,
            color,
            location,
            pictures,
        } = req.body;
        if (
            !type ||
            !canBeTradedFor ||
            !title ||
            !description ||
            !estimatedValue ||
            !category ||
            !location ||
            !subCategory
        ) {
            res.status(STATUS_CODES.VALIDATION_ERROR);
            throw new Error("All Fields are Required");
        }

        const product = new Product(req.body);
        product.currentOwner = req.user._id;
        if (req.body.pictures) product.pictures = pictures.split(",");
        if (req.body.canBeTradedFor)
            product.canBeTradedFor = canBeTradedFor.toLowerCase().split(",");
        await product.save();
        // remove user products array
        // req.user.products.push(product);
        // await req.user.save();
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
        const products = await Product.find().populate("currentOwner");
        res.send(products);
    } catch (error) {
        next(error);
    }
};

//@desc get all products by user Id
//@route GET /api/products/by-userId/:userId
//@access private
export const getAllProductsByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const products = await Product.find({ currentOwner: userId });
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
        const product = await Product.findById(productId).populate(
            "currentOwner"
        );
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
        const myProducts = await Product.find({
            currentOwner: req.user._id,
        }).populate("currentOwner");
        if (myProducts.length === 0) {
            res.status(STATUS_CODES.NOT_FOUND);
            throw new Error("You didn't add any products of your own yet");
        }
        res.send(myProducts);
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
        if (!product.currentOwner._id.equals(req.user._id)) {
            res.status(STATUS_CODES.FORBIDDEN);
            throw new Error("You are not authorized to remove this item");
        }

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
        if (req.body.canBeTradedFor) {
            product.canBeTradedFor = req.body?.canBeTradedFor
                .toLowerCase()
                .split(",");
        }
        await product.save();

        res.send({ product, user: req.user });
    } catch (error) {
        next(error);
    }
};

//@desc Search for products
//@route GET /api/products/search/by
//@access private
export const searchProducts = async (req, res, next) => {
    try {
        const searchQuery = req.query.searchQuery.toLowerCase();
        const products = await Product.find();
        // console.log(searchQuery);
        // console.log(products[0].canBeTradedFor);
        // console.log(products[0].canBeTradedFor.includes(searchQuery));

        const filteredProducts = products.filter(
            (product) =>
                product.title.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery) ||
                product.canBeTradedFor.includes(searchQuery) ||
                product.category.toLowerCase().includes(searchQuery) ||
                product.subCategory.toLowerCase().includes(searchQuery) ||
                product.color.toLowerCase().includes(searchQuery)
        );
        res.send(filteredProducts);
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
