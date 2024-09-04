import { Router, Request, Response } from "express";
import { ProductsController } from "../controllers/products.controler";

export const productsRoute = Router();
const productsController = new ProductsController

productsRoute.get("/", async (req: Request, res: Response) => {
    try {
        const products: [] = await productsController.getProducts()
        res.status(200).json({ products: products })
    } catch (error) {
        res.status(400).json({ error: error })
    }
})