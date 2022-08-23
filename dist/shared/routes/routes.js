"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const auth_router_1 = __importDefault(require("../../features/user/presentation/routers/auth_router"));
exports.authRouter = (0, auth_router_1.default)();
