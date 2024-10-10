import { Router, Request, Response } from "express";
import { CouponController } from "../controllers/coupon.controller";

export const couponRoute = Router();
const couponController = new CouponController()

couponRoute.get("/list", async (req: Request, res: Response) => {
    try {
        const coupons = await couponController.listCoupons()
        res.status(200).json({ coupons: coupons })
    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
})

couponRoute.get("/get/:name", async (req: Request, res: Response) => {
    try {
        const name = req.params.name
        const coupon = await couponController.getCouponByName({ name })
        res.status(200).json(coupon)
    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
})

couponRoute.post("/create", async (req: Request, res: Response) => {
    try {
        const data = req.body
        await couponController.createCoupon(data)
        res.status(200).json()
    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
})