import { $Enums, Prisma } from "@prisma/client"

export interface IOrderObject {
    id: string
    created_date: Date
    updated_at: Date
    payment_type: $Enums.OrderPaymentType
    state: $Enums.OrderState
    total_price: Prisma.Decimal
    payer_name: string
    payer_email: string
    payer_document_number: string
    payer_cellphone_number: string
    address_postal_code: string
    address_country: string
    address_state: string
    address_city: string
    address_neighborhood: string
    address_street: string
    address_number: string
    address_complement: string | null
}

export interface CreateOrderRequest {
    paymentType: 'Credit' | 'Debit' | 'Pix'
    payer: PayerData
    address: AddressData
    products: ProductData[]
}

interface ProductData {
    productId: string
    name: string
    quantity: number
}

interface AddressData {
    postalCode: string
    country: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement?: string
}

interface PayerData {
    name: string
    email: string
    documentNumber: string
    cellphoneNumber: string
}