"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../features/user/data/models/user_model"));
const app_error_1 = require("../error/app_error");
const token_1 = require("../functions/token");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const id = (0, token_1.decodeToken)(token);
            // Get user from the token
            req.user = yield user_model_1.default.findById(id);
            next();
        }
        catch (error) {
            console.log(error);
            return new Promise(() => {
                throw new app_error_1.AppError({
                    httpCode: app_error_1.HttpCode.UNAUTHORIZED,
                    description: "Not authorized",
                });
            });
        }
    }
    if (!token) {
        return new Promise(() => {
            throw new app_error_1.AppError({
                httpCode: app_error_1.HttpCode.UNAUTHORIZED,
                description: "Not authorized, no token",
            });
        });
    }
});
exports.default = protect;
