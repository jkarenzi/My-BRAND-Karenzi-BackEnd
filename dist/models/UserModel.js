"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
        default: "https://res.cloudinary.com/ditrc0kph/image/upload/v1711450197/rgrjpswkhjey1xgunqhr.png"
    }
}, { timestamps: true });
module.exports = (0, mongoose_1.model)('User', UserSchema);
