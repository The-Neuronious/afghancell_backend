"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Generate Access Token
const generateAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: "30d",
    });
};
exports.generateAccessToken = generateAccessToken;
// Decode ID and role from token
const decodeToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    const id = decoded.id;
    return id;
};
exports.decodeToken = decodeToken;
