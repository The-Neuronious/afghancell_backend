"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = void 0;
const auth_repository_impl_1 = __importDefault(require("../../features/user/domain/repositories/auth_repository_impl"));
exports.authRepository = new auth_repository_impl_1.default();
