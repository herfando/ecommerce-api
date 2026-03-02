import { Request, Response } from "express";
import Product from "../models/Product";

// GET all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate("category");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// CREATE product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, image, category } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            image,
            category
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};