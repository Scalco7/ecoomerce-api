import { OrderService } from "../services/order.service";
import { IOrderObject } from "../types/order.types";

export class OrderController {
    private service: OrderService

    constructor() {
        this.service = new OrderService()
    }

    public async listOrders(): Promise<IOrderObject[]> {
        return await this.service.listOrders()
    }
}