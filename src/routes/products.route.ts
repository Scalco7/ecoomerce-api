import { Router, Request, Response } from "express";
import { ProductsController } from "../controllers/products.controler";
import { ProductSection } from "../types/products.types";

export const productsRoute = Router();
const productsController = new ProductsController

productsRoute.get("/getBySection", async (req: Request, res: Response) => {
    try {
        const sections: ProductSection[] = await productsController.getProductsBySection()
        res.status(200).json({ sections: sections })
    } catch (error) {
        res.status(400).json({ error: error })
    }
})