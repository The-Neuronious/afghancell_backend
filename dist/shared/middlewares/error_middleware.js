"use strict";
// exceptions/ErrorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const app_error_1 = require("../error/app_error");
class ErrorHandler {
    isTrustedError(error) {
        if (error instanceof app_error_1.AppError) {
            return error.isOperational;
        }
        return false;
    }
    handleTrustedError(error, response) {
        response.status(error.httpCode).json({ message: error.message });
    }
    handleCriticalError(error, response) {
        if (response) {
            response
                .status(app_error_1.HttpCode.INTERNAL_SERVER_ERROR)
                .json({ message: "Internal server error" });
        }
        console.log("Application encountered a critical error. Exiting");
        process.exit(1);
    }
    handleError(error, response) {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error, response);
        }
        else {
            this.handleCriticalError(error, response);
        }
    }
}
exports.errorHandler = new ErrorHandler();
