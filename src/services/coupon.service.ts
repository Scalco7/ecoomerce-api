import { Prisma, PrismaClient } from "@prisma/client";
import { CouponDataForResponse, CouponResponse, CreateCouponRequest, GetCouponByNameRequest } from "../types/coupon.types";
import { generateRandomID } from "../utils/id.utils";

function formatCouponForResponse(coupon: {
    name: string
    discount_percentage: Prisma.Decimal
}): CouponDataForResponse {
    const data: CouponDataForResponse = {
        name: coupon.name,
        discountPercentage: Number(coupon.discount_percentage)
    }

    return data
}

export class CouponsService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    public async getCouponByName({ name }: GetCouponByNameRequest): Promise<CouponDataForResponse> {
        const coupon = await this.prisma.coupon.findUnique({
            where: { name: name },
            select: { name: true, discount_percentage: true, quantity_used: true, max_quantity_to_use: true }
        })

        if (!coupon) {
            await this.prisma.$disconnect()
            throw Error('Cupom inválido')
        }
        if (coupon.max_quantity_to_use && coupon.quantity_used >= coupon.max_quantity_to_use) {
            await this.prisma.$disconnect()
            throw Error('Cupom indisponível')
        }

        await this.prisma.$disconnect()
        return formatCouponForResponse(coupon)
    }

    public async createCoupon(data: CreateCouponRequest): Promise<void> {
        try {
            const same = await this.prisma.coupon.findUnique({
                where: { name: data.name },
                select: { id: true }
            })

            console.log(same)

            if (same) throw Error('Cupom com o mesmo nome já existe.')

            await this.prisma.coupon.create({
                data: {
                    id: generateRandomID(),
                    name: data.name,
                    discount_percentage: data.discountPercentage,
                    quantity_used: 0,
                    max_quantity_to_use: data.availableQuantity ?? null,
                }
            })

            await this.prisma.$disconnect()
            return
        } catch (e) {
            await this.prisma.$disconnect()
            if (e instanceof Error) throw e
            throw Error('Erro ao criar o cupom')
        }
    }

    public async listCoupons(): Promise<CouponResponse[]> {
        const coupons = await this.prisma.coupon.findMany()
        await this.prisma.$disconnect()
        return coupons
    }
}