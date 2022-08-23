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
const delete_user_1 = __importDefault(require("../../domain/use_cases/delete_user"));
const get_distributors_1 = __importDefault(require("../../domain/use_cases/get_distributors"));
const get_retailers_1 = __importDefault(require("../../domain/use_cases/get_retailers"));
const update_me_1 = __importDefault(require("../../domain/use_cases/update_me"));
const update_user_1 = __importDefault(require("../../domain/use_cases/update_user"));
function userRouter(getDistributors = new get_distributors_1.default(), getRetailers = new get_retailers_1.default(), updateMe = new update_me_1.default(), updateUser = new update_user_1.default(), deleteUser = new delete_user_1.default()) {
    const router = express_1.default.Router();
    router.get("/distributors", auth_middleware_1.default, admin_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield getDistributors.call()); }));
    router.get("/retailers", auth_middleware_1.default, distributors_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield getRetailers.call(req)); }));
    router.put("/update_me", auth_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield updateMe.call(req)); }));
    router.put("/update_user", auth_middleware_1.default, distributors_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield updateUser.call(req)); }));
    router.delete("/delete", auth_middleware_1.default, distributors_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).json(yield deleteUser.call(req)); }));
    return router;
}
exports.default = userRouter;
