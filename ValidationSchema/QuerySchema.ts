const Joi = require('joi')

const createQueryValidationSchema = Joi.object({
    userId: Joi.string().length(24).required(),
    query: Joi.string().required()
})

module.exports = {
    createQueryValidationSchema
}