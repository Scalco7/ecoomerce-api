import { Prisma, PrismaClient } from "@prisma/client";
import { CouponDataForResponse, CouponResponse, CreateCouponRequest, GetCouponByNameRequest } from "../types/coupon.types";
import { generateRandomID } from "../utils/id.utils";

function formatCouponForResponse(coupon: {
    name: string
    discoun_percentage: Prisma.Decimal
}): CouponDataForResponse {
    const data: CouponDataForResponse = {
        name: coupon.name,
        discountPercentage: Number(coupon.discoun_percentage)
    }

    return data
}

export class CouponsService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    public async getCouponByName({ name }: GetCouponByNameRequest): Promise<CouponDataForResponse> {
        const coupon = await this.prisma.coupons.findUnique({
            where: { name: name },
            select: { name: true, discoun_percentage: true, quantity_used: true, max_quantity_to_use: true }
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
            this.prisma.coupons.create({
                data: {
                    id: generateRandomID(),
                    name: data.name,
                    discoun_percentage: data.discountPercentage,
                    quantity_used: 0,
                    max_quantity_to_use: data.availableQuantity,
                }
            })

            await this.prisma.$disconnect()
        } catch (e) {
            await this.prisma.$disconnect()
            throw Error('Erro ao criar o cupom')
        }
    }

    public async listCoupons(): Promise<CouponResponse[]> {
        const coupons = await this.prisma.coupons.findMany()
        await this.prisma.$disconnect()
        return coupons
    }
}