import { PrismaClient } from "@prisma/client";
import { IOrderObject } from "../types/order.types";

export class OrderService {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    public async listOrders(): Promise<IOrderObject[]> {
        const orders = await this.prismaClient.order.findMany()
        return orders
    }
}