import { CouponsService } from "../services/coupon.service";
import { CouponDataForResponse, CouponResponse, CreateCouponRequest, GetCouponByNameRequest } from "../types/coupon.types";
import { couponObject } from "../validators/coupon.validators";

export class CouponController {
    private service: CouponsService

    constructor() {
        this.service = new CouponsService()
    }

    public async getCouponByName(data: GetCouponByNameRequest): Promise<CouponDataForResponse> {
        return await this.service.getCouponByName(data)
    }

    public async createCoupon(data: CreateCouponRequest): Promise<void> {
        const { error } = couponObject.validate(data)

        if (error) throw Error(error.message)

        return await this.service.createCoupon(data)
    }

    public async listCoupons(): Promise<CouponResponse[]> {
        return await this.service.listCoupons()
    }
}