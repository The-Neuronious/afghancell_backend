"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUseCase = void 0;
const login_use_case_1 = __importDefault(require("../../features/user/domain/use_cases/login_use_case"));
exports.loginUseCase = new login_use_case_1.default();
