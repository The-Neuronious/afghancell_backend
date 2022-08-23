"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authDataSource = void 0;
const auth_data_source_1 = __importDefault(require("../../features/user/data/data_sources/auth_data_source"));
exports.authDataSource = new auth_data_source_1.default();
