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
const auth_middleware_1 = __importDefault(require("../../../../shared/middlewares/auth_middleware"));
const distributors_1 = __importDefault(require("../../../../shared/middlewares/distributors"));
const my_recharges_1 = __importDefault(require("../../domain/use_cases/my_recharges"));
const recharge_user_1 = __importDefault(require("../../domain/use_cases/recharge_user"));
function rechargeRouter(rechargeUser = new recharge_user_1.default(), myRecharges = new my_recharges_1.default()) {
    const router = express_1.default.Router();
    router.post("/", auth_middleware_1.default, distributors_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(201).json(yield rechargeUser.call(req)); }));
    router.get("/get", auth_middleware_1.default, distributors_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield myRecharges.call(req)); }));
    return router;
}
exports.default = rechargeRouter;
