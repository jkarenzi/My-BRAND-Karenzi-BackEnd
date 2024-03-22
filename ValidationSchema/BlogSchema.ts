export {};
const Joi = require("joi")

const createBlogValidationSchema = Joi.object({
    title: Joi.string().regex(/^\w+(\s+\w+){5,15}[.,?!]?$/).required(),
    content: Joi.string().regex(/^\w+(\s+\w+){99,}[.,?!]?$/).required()
})

const updateBlogValidationSchema = Joi.object({
    id: Joi.string().length(24).required(),
    title: Joi.string().regex(/^\w+(\s+\w+){5,15}[.,?!]?$/).required(),
    content: Joi.string().regex(/^\w+(\s+\w+){99,}[.,?!]?$/).required()
})

const blogActionValidationSchema = Joi.object({
    userId: Joi.string().length(24).required(),
    blogId: Joi.string().length(24).required()
})

module.exports = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
    blogActionValidationSchema
}