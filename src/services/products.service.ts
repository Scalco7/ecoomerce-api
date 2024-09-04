import { ProductSection } from "../types/products.types";
import { PrismaClient } from '@prisma/client'

export class ProductsService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    public async getProductsBySection(): Promise<ProductSection[]> {
        const bdProducts = await this.prisma.product_type.findMany()
        const products: ProductSection[] = [{
            name: "Regatas",
            productTypes: bdProducts.map((bdP) => ({
                ...bdP,
                products: [],
            }))
        }]

        return products
    }
}