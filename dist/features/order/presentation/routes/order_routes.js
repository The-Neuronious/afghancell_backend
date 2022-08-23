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
const express_1 = __importDefault(require("express"));
const admin_middleware_1 = __importDefault(require("../../../../shared/middlewares/admin_middleware"));
const auth_middleware_1 = __importDefault(require("../../../../shared/middlewares/auth_middleware"));
const distributors_1 = __importDefault(require("../../../../shared/middlewares/distributors"));
const all_orders_1 = __importDefault(require("../../domain/use_cases/all_orders"));
const create_order_1 = __importDefault(require("../../domain/use_cases/create_order"));
const distributor_card_data_1 = __importDefault(require("../../domain/use_cases/distributor_card_data"));
const my_orders_1 = __importDefault(require("../../domain/use_cases/my_orders"));
const orders_by_week_1 = __importDefault(require("../../domain/use_cases/orders_by_week"));
const order_action_1 = __importDefault(require("../../domain/use_cases/order_action"));
const pending_orders_1 = __importDefault(require("../../domain/use_cases/pending_orders"));
function orderRouter(createOrder = new create_order_1.default(), pendingOrders = new pending_orders_1.default(), allOrders = new all_orders_1.default(), myOrders = new my_orders_1.default(), orderAction = new order_action_1.default(), ordersByWeek = new orders_by_week_1.default(), distributorCardData = new distributor_card_data_1.default()) {
    const router = express_1.default.Router();
    router.post("/create", auth_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(201).json(yield createOrder.call(req)); }));
    router.get("/pending", auth_middleware_1.default, admin_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield pendingOrders.call()); }));
    router.get("/all", auth_middleware_1.default, admin_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield allOrders.call(req)); }));
    router.get("/my", auth_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield myOrders.call(req)); }));
    router.get("/orders_by_week", auth_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield ordersByWeek.call(req)); }));
    router.get("/distributor_card_data", auth_middleware_1.default, distributors_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield distributorCardData.call(req)); }));
    router.put("/action", auth_middleware_1.default, admin_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield orderAction.call(req)); }));
    return router;
}
exports.default = orderRouter;
