"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rechargeSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    recharged_user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    amount: {
        type: Number,
        required: [true, "Please add amount"],
    },
}, {
    timestamps: true,
});
const Recharge = mongoose_1.default.model("Recharge", rechargeSchema);
exports.default = Recharge;
