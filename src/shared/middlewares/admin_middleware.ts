import { NextFunction, Request, Response } from "express";
import { AppError, HttpCode } from "../error/app_error";

const admin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
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

export default admin;
