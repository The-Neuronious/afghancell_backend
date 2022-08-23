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
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = require("../error/app_error");
const admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user.role === "admin") {
        next();
    }
    else {
        return new Promise(() => {
            throw new app_error_1.AppError({
                httpCode: app_error_1.HttpCode.UNAUTHORIZED,
                description: "You are not allowed to access",
            });
        });
    }
});
exports.default = admin;
