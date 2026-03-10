import { Request, Response } from "express";
import Product from "../models/Product.js";


// GET all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


// CREATE product
export const createProduct = async (req: Request, res: Response) => {
    try {

        const {
            id,
            title,
            description,
            category,
            price,
            discountPercentage,
            rating,
            stock,
            tags,
            brand,
            sku,
            weight,
            dimensions,
            warrantyInformation,
            shippingInformation,
            availabilityStatus,
            reviews,
            returnPolicy,
            minimumOrderQuantity,
            meta,
            images
        } = req.body;


        const product = await Product.create({
            id,
            title,
            description,
            category,
            price,
            discountPercentage,
            rating,
            stock,
            tags,
            brand,
            sku,
            weight,
            dimensions,
            warrantyInformation,
            shippingInformation,
            availabilityStatus,
            reviews,
            returnPolicy,
            minimumOrderQuantity,
            meta,
            images
        });

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};