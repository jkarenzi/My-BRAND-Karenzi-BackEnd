export {};
const Joi = require("joi")

const createBlogValidationSchema = Joi.object({
    title: Joi.string().regex(/[A-Za-z0-9\s.?!,;:-]/).required(),
    content: Joi.string().regex(/[A-Za-z0-9\s.?!,;:-]/).required(),
})

const updateBlogValidationSchema = Joi.object({
    id: Joi.string().length(24).required(),
    title: Joi.string().regex(/[A-Za-z0-9\s.?!,;:-]/).required(),
    content: Joi.string().regex(/[A-Za-z0-9\s.?!,;:-]/).required(),
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