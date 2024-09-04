import { Router, Request, Response } from "express";

export const productsRoute = Router();

productsRoute.get("/", async (req: Request, res: Response) => {
    res.json({ p: "olaaa" })

    try {
        const products: [] = []
        res.status(200).json({ products: products })
    } catch (error) {
        res.status(400).json({ error: error })
    }
})