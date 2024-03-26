export {};
const Joi = require("joi")

const updateUsernameSchema = Joi.object({
    id: Joi.string().length(24).required(),
    newUsername: Joi.string().alphanum().min(3).max(10).required(),
    password: Joi.string().regex(/^[A-Za-z0-9]{8,}$/).message('Password must be at least 8 characters long and contain only letters and numbers').required()
})

const updateEmailSchema = Joi.object({
    id: Joi.string().length(24).required(),
    newEmail: Joi.string().email().required(),
    password: Joi.string().regex(/^[A-Za-z0-9]{8,}$/).message('Password must be at least 8 characters long and contain only letters and numbers').required()
})

const updatePasswordSchema = Joi.object({
    id: Joi.string().length(24).required(),
    oldPassword: Joi.string().regex(/^[A-Za-z0-9]{8,}$/).message('Password must be at least 8 characters long and contain only letters and numbers').required(),
    newPassword: Joi.string().regex(/^[A-Za-z0-9]{8,}$/).message('Password must be at least 8 characters long and contain only letters and numbers').required()
})

const updateProfileSchema = Joi.object({
    id: Joi.string().length(24).required(),
    password: Joi.string().regex(/^[A-Za-z0-9]{8,}$/).message('Password must be at least 8 characters long and contain only letters and numbers').required()
})

module.exports = {
    updateUsernameSchema,
    updatePasswordSchema,
    updateEmailSchema,
    updateProfileSchema
}