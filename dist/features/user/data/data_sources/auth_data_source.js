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
const user_model_1 = __importDefault(require("../models/user_model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hash_1 = require("../../../../shared/functions/hash");
const app_error_1 = require("../../../../shared/error/app_error");
class AuthDataSource {
    // Username and Password validation
    validateUsernameAndPassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield user_model_1.default.findOne({ username: user.username }).select("+password");
            if (findUser && (yield bcryptjs_1.default.compare(user.password, findUser.password))) {
                return findUser;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.NOT_FOUND,
                        description: "Your username or password is incorrect.",
                    });
                });
            }
        });
    }
    checkUserExist(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield user_model_1.default.findOne({
                $or: [{ username: user.username }, { contact: user.contact }],
            });
            if (findUser) {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.UNAUTHORIZED,
                        description: "User with this username or phone number already exists",
                    });
                });
            }
        });
    }
    createUser(user, authUser, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield user_model_1.default.create({
                username: user.username,
                country: user.country,
                contact: user.contact,
                role: role,
                state: user.state,
                displayname: user.displayname,
                user: authUser,
                user_id: yield this.newUserId(),
                password: yield (0, hash_1.hashPassword)(user.password),
            });
        });
    }
    newUserId() {
        return __awaiter(this, void 0, void 0, function* () {
            const userbyid = yield user_model_1.default.findOne({}, {}, { sort: { createdAt: -1 } });
            let userId = 1000;
            if (userbyid) {
                userId = +userbyid.user_id + 1;
            }
            return userId;
        });
    }
}
exports.default = AuthDataSource;
