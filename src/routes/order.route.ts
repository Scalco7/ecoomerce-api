import { Router, Request, Response } from "express";
import { OrderController } from "../controllers/order.controller";

export const orderRoute = Router();
const orderController = new OrderController()

orderRoute.get("/list", async (req: Request, res: Response) => {
    try {
        const orders = await orderController.listOrders()
        res.status(200).json({ orders: orders })
    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
})