"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    operataor: {
        type: String,
        required: [true, "Please add operator"],
    },
    topup_no: {
        type: String,
        required: [true, "Please add topup no"],
    },
    amount: {
        type: Number,
        default: 0,
    },
    date: {
        type: String,
    },
    action: {
        type: String,
        enum: ["pending", "approve", "deny"],
        default: "pending",
    },
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
