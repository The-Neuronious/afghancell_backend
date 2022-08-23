"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./resources/db"));
const auth_routes_1 = __importDefault(require("./features/user/presentation/routers/auth_routes"));
const error_middleware_1 = require("./shared/middlewares/error_middleware");
const user_routes_1 = __importDefault(require("./features/user/presentation/routers/user_routes"));
const order_routes_1 = __importDefault(require("./features/order/presentation/routes/order_routes"));
const recharge_route_1 = __importDefault(require("./features/recharge/presentation/routes/recharge_route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 500;
(0, db_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Routes
app.use("/api/auth", (0, auth_routes_1.default)());
app.use("/api/user", (0, user_routes_1.default)());
app.use("/api/order", (0, order_routes_1.default)());
app.use("/api/recharge", (0, recharge_route_1.default)());
// Error Handler Middleware
app.use((err, req, res, next) => {
    error_middleware_1.errorHandler.handleError(err, res);
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
