"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    user_id: {
        type: Number,
    },
    username: {
        type: String,
        required: [true, "Please add a user name"],
    },
    display_name: {
        type: String,
        required: [true, "Please add a display name"],
    },
    contact: {
        type: String,
        required: [true, "Please add a phone number"],
    },
    password: {
        type: String,
        select: false,
        required: [true, "Please add a password"],
    },
    amount: {
        type: Number,
        default: 0,
    },
    country: {
        type: String,
        required: [true, "Please enter country"],
    },
    state: {
        type: String,
        required: [true, "Please enter state"],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    role: {
        type: String,
        enum: ["admin", "distributor", "retailer"],
        default: "distributor",
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
