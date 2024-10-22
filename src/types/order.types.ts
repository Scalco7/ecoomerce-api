import { $Enums } from "@prisma/client"

export interface IOrderObject {
    id: string
    created_date: Date
    updated_at: Date
    payment_type: $Enums.OrderPaymentType
    state: $Enums.OrderState
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