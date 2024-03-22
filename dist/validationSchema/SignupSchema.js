"use strict";
const Joi = require('joi');
const signupValidationSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(10).required(),
    password: Joi.string().regex(/^[A-Za-z0-9]{8,}$/).message('Password must be at least 8 characters long and contain only letters and numbers').required(),
    email: Joi.string().email().required(),
});
module.exports = {
    signupValidationSchema
};
