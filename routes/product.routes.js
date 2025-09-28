import express from "express";
import {
    createProduct,
    getAllMyProducts,
    getAllProducts,
    getAllProductsByUserId,
    getProduct,
    removeProduct,
    searchProducts,
    updateProduct,
} from "../controllers/productController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/exchange/products/all-products/:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products (requires authentication)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get("/all-products/", validateToken, getAllProducts);

/**
 * @swagger
 * /api/v1/exchange/products/search/by:
 *   get:
 *     summary: Search products
 *     description: Search products by various criteria (requires authentication)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *         example: "iPhone"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *         example: "Electronics"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [Goods, Service]
 *         description: Filter by product type
 *         example: "Goods"
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location
 *         example: "New York"
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/search/by", validateToken, searchProducts);

/**
 * @swagger
 * /api/v1/exchange/products/create:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product listing (requires authentication)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - category
 *               - subCategory
 *               - canBeTradedFor
 *               - title
 *               - description
 *               - estimatedValue
 *               - location
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [Goods, Service]
 *                 description: Type of product
 *                 example: "Goods"
 *               category:
 *                 type: string
 *                 description: Main category
 *                 example: "Electronics"
 *               subCategory:
 *                 type: string
 *                 description: Sub-category
 *                 example: "Smartphones"
 *               canBeTradedFor:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Items this can be traded for
 *                 example: ["Electronics", "Books", "Clothing"]
 *               title:
 *                 type: string
 *                 description: Product title
 *                 example: "iPhone 12 Pro"
 *               description:
 *                 type: string
 *                 description: Product description
 *                 example: "Excellent condition iPhone 12 Pro, 128GB, Space Gray"
 *               estimatedValue:
 *                 type: number
 *                 minimum: 0
 *                 description: Estimated value
 *                 example: 800
 *               color:
 *                 type: string
 *                 description: Product color
 *                 example: "Space Gray"
 *               pictures:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of picture URLs
 *                 example: ["https://example.com/image1.jpg"]
 *               location:
 *                 type: string
 *                 description: Product location
 *                 example: "New York, NY"
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/create", validateToken, createProduct);

/**
 * @swagger
 * /api/v1/exchange/products/myProducts:
 *   get:
 *     summary: Get my products
 *     description: Get all products owned by the current user (requires authentication)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/myProducts", validateToken, getAllMyProducts);

/**
 * @swagger
 * /api/v1/exchange/products/{productId}:
 *   get:
 *     summary: Get product by ID
 *     description: Get a specific product by its ID (requires authentication)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/:productId", validateToken, getProduct);

/**
 * @swagger
 * /api/v1/exchange/products/by-userId/{userId}:
 *   get:
 *     summary: Get products by user ID
 *     description: Get all products owned by a specific user (requires authentication)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: "507f1f77bcf86cd799439012"
 *     responses:
 *       200:
 *         description: User's products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/by-userId/:userId", validateToken, getAllProductsByUserId);

/**
 * @swagger
 * /api/v1/exchange/products/{productId}:
 *   delete:
 *     summary: Delete product
 *     description: Delete a product by ID (requires authentication, owner only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the owner
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:productId", validateToken, removeProduct);

/**
 * @swagger
 * /api/v1/exchange/products/{productId}:
 *   put:
 *     summary: Update product
 *     description: Update a product by ID (requires authentication, owner only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [Goods, Service]
 *               category:
 *                 type: string
 *               subCategory:
 *                 type: string
 *               canBeTradedFor:
 *                 type: array
 *                 items:
 *                   type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               estimatedValue:
 *                 type: number
 *                 minimum: 0
 *               color:
 *                 type: string
 *               pictures:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not the owner
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put("/:productId", validateToken, updateProduct);

export default router;
