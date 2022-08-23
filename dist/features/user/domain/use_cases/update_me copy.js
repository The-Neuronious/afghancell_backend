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
const user_repository_impl_1 = __importDefault(require("../repositories/user_repository_impl"));
class UpdateMeUseCase {
    constructor() {
        this.userRepository = new user_repository_impl_1.default();
    }
    call(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let user = {
                _id: (_a = params.user) === null || _a === void 0 ? void 0 : _a._id,
                user_id: params.body.user_id,
                username: params.body.username,
                displayname: (_b = params.body) === null || _b === void 0 ? void 0 : _b.displayname,
                amount: params.body.amount,
                contact: params.body.contact,
                country: params.body.country,
                password: params.body.password,
                role: params.body.role,
                state: params.body.state,
                user: params.user,
            };
            console.log(params.body);
            const result = yield this.userRepository.updateUser(user);
            return user;
        });
    }
}
exports.default = UpdateMeUseCase;
