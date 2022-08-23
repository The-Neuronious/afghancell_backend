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
const order_repository_impl_1 = __importDefault(require("../repositories/order_repository_impl"));
class CreateOrderUseCase {
    constructor() {
        this.orderRepository = new order_repository_impl_1.default();
    }
    call(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let order = {
                user: params.user,
                amount: params.body.amount,
                operataor: params.body.operator,
                topup_no: params.body.topup_no,
                action: "pending",
            };
            const result = yield this.orderRepository.createOrder(order);
            return result;
        });
    }
}
exports.default = CreateOrderUseCase;
