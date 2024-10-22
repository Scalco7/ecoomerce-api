import { OrderService } from "../services/order.service";
import { CreateOrderRequest, IOrderObject } from "../types/order.types";
import { orderObject } from "../validators/order.validators";

export class OrderController {
    private service: OrderService

    constructor() {
        this.service = new OrderService()
    }

    public async listOrders(): Promise<IOrderObject[]> {
        return await this.service.listOrders()
    }

    public async createOrder(data: CreateOrderRequest): Promise<void> {
        const { error } = orderObject.validate(data)

        if (error) throw Error(error.message)

        return await this.service.createOrder(data)
    }
}