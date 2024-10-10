import { Prisma } from "@prisma/client"

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
    availableQuantity?: number
}

export interface CouponResponse {
    id: string
    name: string
    discount_percentage: Prisma.Decimal
    quantity_used: number
    max_quantity_to_use: number | null
    created_date: Date
}