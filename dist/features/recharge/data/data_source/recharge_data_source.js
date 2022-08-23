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
const app_error_1 = require("../../../../shared/error/app_error");
const recharge_model_1 = __importDefault(require("../models/recharge_model"));
class RechargeDataSource {
    rechargeUser(recharge) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRecharge = yield recharge_model_1.default.create({
                amount: recharge.amount,
                user: recharge.user,
                recharged_user: recharge.recharged_user,
            });
            if (newRecharge) {
                return newRecharge;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.NOT_FOUND,
                        description: "User not recharged",
                    });
                });
            }
        });
    }
    getMyRecharge(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const recharges = yield recharge_model_1.default.find({ user: user }).populate("recharged_user");
            if (recharges) {
                return recharges;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.NOT_FOUND,
                        description: "Recharge not found",
                    });
                });
            }
        });
    }
}
exports.default = RechargeDataSource;
