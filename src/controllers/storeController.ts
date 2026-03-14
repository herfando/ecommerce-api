import { Request, Response } from "express";
import Store from "../models/Store.js";

export const createStore = async (req: Request, res: Response) => {
    try {
        const { storeName, storeDomain, city, postalCode, address } = req.body;

        const newStore = new Store({
            storeName,
            storeDomain,
            city,
            postalCode,
            address,
        });

        await newStore.save();

        res.status(201).json({
            message: "Store created successfully",
            store: newStore,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};