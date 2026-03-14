import express from "express";
import { createStore } from "../controllers/storeController.js";

const router = express.Router();

/**
 * @swagger
 * /api/stores:
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
 *     description: Create a store for a seller
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - storeName
 *               - storeDomain
 *               - city
 *               - postalCode
 *               - address
 *             properties:
 *               storeName:
 *                 type: string
 *                 example: Herfando Store
 *               storeDomain:
 *                 type: string
 *                 example: herfando-shop
 *               city:
 *                 type: string
 *                 example: Palembang
 *               postalCode:
 *                 type: string
 *                 example: 30111
 *               address:
 *                 type: string
 *                 example: Jl Sudirman No 20
 *     responses:
 *       201:
 *         description: Store created successfully
 *       500:
 *         description: Server error
 */
router.post("/stores", createStore);

export default router;