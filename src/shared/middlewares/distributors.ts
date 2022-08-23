import { NextFunction, Request, Response } from "express";
import { AppError, HttpCode } from "../error/app_error";

const distributor = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "distributor")) {
    next();
  } else {
    return new Promise(() => {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "You are not allowed to access",
      });
    });
  }
};

export default distributor;
