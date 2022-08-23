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
const user_data_source_1 = __importDefault(require("../../../user/data/data_sources/user_data_source"));
const recharge_data_source_1 = __importDefault(require("../../data/data_source/recharge_data_source"));
class RechargeRepositoryImpl {
    constructor() {
        this.rechargeDataSource = new recharge_data_source_1.default();
        this.userDataSource = new user_data_source_1.default();
    }
    rechargeUser(recharge) {
        return __awaiter(this, void 0, void 0, function* () {
            if (recharge.user.role != "admin") {
                yield this.userDataSource.decreaseUserAmount(recharge.user._id.toString(), recharge.amount);
            }
            yield this.userDataSource.increaseUserAmount(recharge.recharged_user._id.toString(), recharge.amount);
            return yield this.rechargeDataSource.rechargeUser(recharge);
        });
    }
    getMyRecharge(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.rechargeDataSource.getMyRecharge(user);
        });
    }
}
exports.default = RechargeRepositoryImpl;
