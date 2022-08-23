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
const moment_1 = __importDefault(require("moment"));
const app_error_1 = require("../../../../shared/error/app_error");
const user_model_1 = __importDefault(require("../../../user/data/models/user_model"));
const time_1 = require("../../domain/services/time");
const order_model_1 = __importDefault(require("../models/order_model"));
class OrderDataSource {
    findUserPendingOrder5Min(user, topupNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = (0, time_1.get5MinBeforeTime)();
            const findPendingOrder = yield order_model_1.default.find({
                action: "pending",
                user: user,
                topup_no: topupNo,
                createdAt: {
                    $gte: today.toDate(),
                    $lte: (0, moment_1.default)(today).endOf("day").toDate(),
                },
            });
            if (findPendingOrder.length != 0 && findPendingOrder != null) {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.NOT_FOUND,
                        description: "You can not reload on this number before 5 minutes",
                    });
                });
            }
        });
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOrder = yield order_model_1.default.create({
                amount: order.amount,
                operataor: order.operataor,
                topup_no: order.topup_no,
                user: order.user,
            });
            if (newOrder) {
                yield user_model_1.default.findByIdAndUpdate(order.user._id, {
                    amount: order.user.amount - order.amount,
                });
                return newOrder;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.BAD_REQUEST,
                        description: "Order not created",
                    });
                });
            }
        });
    }
    getAllCompletedOrders(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const fromDate = (0, moment_1.default)(from, "DD-MM-YYYY");
            const toDate = (0, moment_1.default)(to, "DD-MM-YYYY");
            const orders = yield order_model_1.default.find({
                action: { $ne: "pending" },
                createdAt: {
                    $gte: (0, moment_1.default)(fromDate).startOf("day").toDate(),
                    $lte: (0, moment_1.default)(toDate).endOf("day").toDate(),
                },
            }).populate("user");
            if (orders) {
                return orders;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.BAD_REQUEST,
                        description: "Orders not found",
                    });
                });
            }
        });
    }
    getMyCompletedOrders(user, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const fromDate = (0, moment_1.default)(from, "DD-MM-YYYY");
            const toDate = (0, moment_1.default)(to, "DD-MM-YYYY");
            const orders = yield order_model_1.default.find({
                user: user._id,
                createdAt: {
                    $gte: (0, moment_1.default)(fromDate).startOf("day").toDate(),
                    $lte: (0, moment_1.default)(toDate).endOf("day").toDate(),
                },
            }).populate("user");
            if (orders) {
                return orders;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.BAD_REQUEST,
                        description: "Orders not found",
                    });
                });
            }
        });
    }
    getPendingOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.default.find({ action: "pending" }).populate("user");
            if (orders) {
                return orders;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.BAD_REQUEST,
                        description: "Pending order not found",
                    });
                });
            }
        });
    }
    orderAction(id, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.default.findById(id).populate("user");
            if (order) {
                order.action = action;
                yield order.save();
                if (action != "approve") {
                    yield user_model_1.default.findByIdAndUpdate(order.user._id, {
                        amount: order.user.amount + order.amount,
                    });
                }
                return order;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.BAD_REQUEST,
                        description: "Order not found",
                    });
                });
            }
        });
    }
    getNoOfOrdersByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.default.count({
                createdAt: {
                    $gte: (0, moment_1.default)(date).startOf("day").toDate(),
                    $lte: (0, moment_1.default)(date).endOf("day").toDate(),
                },
            });
            return orders;
        });
    }
    getTotalOrdersOfUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalorders = yield order_model_1.default.count({
                action: "approve",
                user,
            });
            return totalorders;
        });
    }
    getTotalIncome(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const credit = yield order_model_1.default.aggregate([
                {
                    $match: {
                        action: "approve",
                        user: user._id,
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: "$amount" },
                    },
                },
            ]);
            return credit[0]["totalAmount"];
        });
    }
}
exports.default = OrderDataSource;
