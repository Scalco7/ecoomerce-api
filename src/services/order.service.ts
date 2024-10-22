import { PrismaClient } from "@prisma/client";
import { CreateOrderRequest, IOrderObject } from "../types/order.types";
import { generateRandomID } from "../utils/id.utils";

export class OrderService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient()
    }

    public async listOrders(): Promise<IOrderObject[]> {
        const orders = await this.prisma.order.findMany()
        return orders
    }

    public async createOrder(data: CreateOrderRequest): Promise<void> {
        let totalPrice: number = 0
        try {
            for (let product of data.products) {
                try {
                    const dbProduct = await this.prisma.product.findUniqueOrThrow(
                        {
                            where: { id: product.productId },
                            select: { available_quantity: true, promotion_price: true }
                        }
                    )

                    if (dbProduct.available_quantity < product.quantity)
                        throw Error(`Produto ${product.name} tem somente ${dbProduct.available_quantity} unidades disponíveis`)

                    totalPrice += (Number(dbProduct.promotion_price) * product.quantity)
                } catch (e) {
                    if (e instanceof Error) throw e
                    throw Error(`Produto ${product.name} inexistente`)
                }
            }

            await this.prisma.order.create({
                data: {
                    id: generateRandomID(),
                    payment_type: data.paymentType,
                    state: data.paymentType == 'Pix' ? 'AwaitingPayment' : 'ProcessingPayment',
                    total_price: totalPrice,
                    payer_name: data.payer.name,
                    payer_email: data.payer.email,
                    payer_document_number: data.payer.documentNumber,
                    payer_cellphone_number: data.payer.cellphoneNumber,
                    address_postal_code: data.address.postalCode,
                    address_country: data.address.country,
                    address_state: data.address.state,
                    address_city: data.address.city,
                    address_neighborhood: data.address.neighborhood,
                    address_street: data.address.street,
                    address_number: data.address.number,
                    address_complement: data.address.complement,
                    order_product: {
                        create: data.products.map((product) => (
                            {
                                id: generateRandomID(),
                                product: {
                                    connect: { id: product.productId }
                                }
                            }))
                    }
                }
            })

            for (let product of data.products) {
                await this.prisma.product.update(
                    {
                        where: { id: product.productId },
                        data: { available_quantity: { decrement: product.quantity } }
                    }
                )
            }

            // Mandar e-mail comprovando a compra

            await this.prisma.$disconnect()
            return
        } catch (e) {
            await this.prisma.$disconnect()
            if (e instanceof Error) throw e
            throw Error('Erro ao criar o pedido')
        }
    }
}