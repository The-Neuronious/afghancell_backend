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
const hash_1 = require("../../../../shared/functions/hash");
const user_model_1 = __importDefault(require("../models/user_model"));
class UserDataSource {
    getAllDistributors() {
        return __awaiter(this, void 0, void 0, function* () {
            const findDistributers = yield user_model_1.default.find({ role: "distributor" });
            return findDistributers;
        });
    }
    getDistributorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findDistributer = yield user_model_1.default.findById(id);
            if (findDistributer) {
                return findDistributer;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.NOT_FOUND,
                        description: "Distributor with this id does not exist",
                    });
                });
            }
        });
    }
    getAllRetailers(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const findRetailers = yield user_model_1.default.find({ role: "retailer", user: user });
            return findRetailers;
        });
    }
    updateUser(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield user_model_1.default.findById(user._id).select("+password");
            if (findUser) {
                findUser.username = isEmpty(user.username)
                    ? findUser.username
                    : user.username;
                findUser.displayname = isEmpty(user.displayname)
                    ? findUser.displayname
                    : user.displayname;
                findUser.contact = isEmpty(user.contact)
                    ? findUser.contact
                    : user.contact;
                findUser.password = isEmpty(user.password)
                    ? findUser.password
                    : yield (0, hash_1.hashPassword)((_a = user.password) !== null && _a !== void 0 ? _a : "");
                findUser.amount = isEmpty(user.amount) ? findUser.amount : user.amount;
                findUser.country = isEmpty(user.country)
                    ? findUser.country
                    : user.country;
                findUser.state = isEmpty(user.state) ? findUser.state : user.state;
                yield findUser.save();
                return findUser;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.NOT_FOUND,
                        description: "User with this id does not exist",
                    });
                });
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield user_model_1.default.findById(id);
            if (findUser) {
                yield findUser.remove();
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.NOT_FOUND,
                        description: "User with this id does not exist",
                    });
                });
            }
        });
    }
    increaseUserAmount(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default.findByIdAndUpdate(id, {
                $inc: { amount: +amount },
            });
        });
    }
    decreaseUserAmount(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(id);
            if (user) {
                if (user.amount < amount) {
                    return new Promise(() => {
                        throw new app_error_1.AppError({
                            httpCode: app_error_1.HttpCode.BAD_REQUEST,
                            description: "This amount is greater than your balance",
                        });
                    });
                }
                else {
                    user.amount -= amount;
                    yield user.save();
                }
            }
        });
    }
    getUserFromContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ contact: contact });
            if (user) {
                return user;
            }
            else {
                return new Promise(() => {
                    throw new app_error_1.AppError({
                        httpCode: app_error_1.HttpCode.NOT_FOUND,
                        description: "User with this contact not found",
                    });
                });
            }
        });
    }
}
function isEmpty(item) {
    return item == undefined || item == null || item == "";
}
exports.default = UserDataSource;
