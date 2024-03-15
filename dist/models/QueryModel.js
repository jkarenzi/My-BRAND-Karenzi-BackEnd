"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuerySchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    }
}, { timestamps: true });
module.exports = (0, mongoose_1.model)('Query', QuerySchema);
