export interface CouponDataForResponse {
    name: string
    discountPercentage: number
}

export interface GetCouponByNameRequest {
    name: string
}

export interface CreateCouponRequest {
    name: string
    discountPercentage: number
    availableQuantity: number
}