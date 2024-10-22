import Joi from "joi";

export const orderObject = Joi.object({
    paymentType: Joi.string().valid('Credit', 'Debit', 'Pix').required(),
    payer: Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().email().required(),
        documentNumber: Joi.string().required(),
        cellphoneNumber: Joi.string().required().min(11).max(11),
    }),
    address: Joi.object({
        postalCode: Joi.string().required().min(8).max(8),
        country: Joi.string().required().min(3),
        state: Joi.string().required().min(3),
        city: Joi.string().required().min(3),
        neighborhood: Joi.string().required().min(3),
        street: Joi.string().required().min(3),
        number: Joi.number().required().min(0),
        complement: Joi.string(),
    }),
    products: Joi.array().required().min(1).items(Joi.object({
        productId: Joi.string().required(),
        name: Joi.string().required().min(3),
        quantity: Joi.number().required(),
    }))
})