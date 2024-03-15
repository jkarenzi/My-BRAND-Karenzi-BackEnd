"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DislikeSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    blogId: {
        type: String,
        required: true
    }
}, { timestamps: true });
module.exports = (0, mongoose_1.model)('Dislike', DislikeSchema);
