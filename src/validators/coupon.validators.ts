import Joi from "joi";

export const couponObject = Joi.object({
    name: Joi.string().alphanum().min(3).max(16).required(),
    discountPercentage: Joi.number().min(1).max(100).required(),
    availableQuantity: Joi.number().min(1)
})