"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrderAmount = void 0;
const app_error_1 = require("../../../../shared/error/app_error");
const checkOrderAmount = (userAmount, amount) => {
    if (userAmount < amount) {
        throw new app_error_1.AppError({
            httpCode: app_error_1.HttpCode.NOT_FOUND,
            description: "Transaction amount in greater than your balance...",
        });
    }
    if (amount < 50) {
        throw new app_error_1.AppError({
            httpCode: app_error_1.HttpCode.NOT_FOUND,
            description: "Transaction should be greater than 50...",
        });
    }
    if (amount > 20000) {
        throw new app_error_1.AppError({
            httpCode: app_error_1.HttpCode.NOT_FOUND,
            description: "Transaction should be smaller than 20,001...",
        });
    }
};
exports.checkOrderAmount = checkOrderAmount;
