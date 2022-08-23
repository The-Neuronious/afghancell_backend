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
const user_data_source_1 = __importDefault(require("../../data/data_sources/user_data_source"));
const user_mapper_1 = __importDefault(require("../../data/mapper/user_mapper"));
class UserRepositoryImpl {
    constructor() {
        this.userDataSource = new user_data_source_1.default();
        this.userMapper = new user_mapper_1.default();
    }
    getDistributors() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDataSource.getAllDistributors();
        });
    }
    getDistributorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDataSource.getDistributorById(id);
        });
    }
    getRetailers(distributor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDataSource.getAllRetailers(distributor);
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDataSource.updateUser(user);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userDataSource.deleteUser(id);
            const response = {
                message: "User deleted successfully",
            };
            return response;
        });
    }
}
exports.default = UserRepositoryImpl;
