const createCommentValidationSchema = Joi.object({
    userId: Joi.string().length(24).required(),
    blogId: Joi.string().length(24).required(),
    comment: Joi.string().required()
})

const updateCommentValidationSchema = Joi.object({
    id: Joi.string().length(24).required(),
    comment: Joi.string().required()
})

module.exports = {
    createCommentValidationSchema,
    updateCommentValidationSchema
}