import "express-async-errors";
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./resources/db";
import authRouter from "./features/user/presentation/routers/auth_routes";
import { errorHandler } from "./shared/middlewares/error_middleware";
import UserModel from "./features/user/data/models/interfaces/user";
import userRouter from "./features/user/presentation/routers/user_routes";
import orderRouter from "./features/order/presentation/routes/order_routes";
import rechargeRouter from "./features/recharge/presentation/routes/recharge_route";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: UserModel | null;
    }
  }
}

const app: Express = express();
const port = process.env.PORT || 500;

connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/auth", authRouter());
app.use("/api/user", userRouter());
app.use("/api/order", orderRouter());
app.use("/api/recharge", rechargeRouter());

// Error Handler Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
