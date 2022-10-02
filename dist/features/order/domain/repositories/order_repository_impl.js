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
const order_data_source_1 = __importDefault(require("../../data/data_source/order_data_source"));
const order_1 = require("../services/order");
const moment_1 = __importDefault(require("moment"));
const days_1 = require("../../../recharge/domain/services/days");
const approve_order_1 = require("../services/approve_order");
class OrderRepositoryImpl {
    constructor() {
        this.orderDataSource = new order_data_source_1.default();
    }
    getMyOrders(user, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderDataSource.getMyCompletedOrders(user, from, to);
        });
    }
    orderAction(id, action) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderDataSource.orderAction(id, action);
        });
    }
    getAllOrders(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderDataSource.getAllCompletedOrders(from, to);
        });
    }
    getPendingOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderDataSource.getPendingOrders();
        });
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, order_1.checkOrderAmount)(order.user.amount, order.amount);
            yield this.orderDataSource.findUserPendingOrder5Min(order.user, order.topup_no);
            const newOrder = yield this.orderDataSource.createOrder(order);
            const isApproved = yield (0, approve_order_1.approveOrder)(order);
            if (isApproved) {
                yield this.orderAction(newOrder._id.toString(), "approve");
            }
            return newOrder;
        });
    }
    getNoOfOrdersByWeek() {
        return __awaiter(this, void 0, void 0, function* () {
            let orders = [];
            for (let i = 0; i < 7; i++) {
                const previousDate = (0, days_1.getPreviousDay)(i);
                let order = {
                    orders: yield this.orderDataSource.getNoOfOrdersByDate(previousDate),
                    date: (0, moment_1.default)(previousDate).format("DD-MM-YYYY"),
                };
                orders.push(order);
            }
            return orders;
        });
    }
    getDistributorCardData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderDataSource.getTotalOrdersOfUser(user);
            const balance = user.amount;
            let income = 0;
            if (orders > 0) {
                income = yield this.orderDataSource.getTotalIncome(user);
            }
            const res = {
                orders: orders,
                balance: balance,
                income: income,
            };
            return res;
        });
    }
}
exports.default = OrderRepositoryImpl;
