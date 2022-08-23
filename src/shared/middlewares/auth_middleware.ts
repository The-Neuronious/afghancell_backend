import { NextFunction, Request, Response } from "express";
import User from "../../features/user/data/models/user_model";
import { AppError, HttpCode } from "../error/app_error";
import { decodeToken } from "../functions/token";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const id: string = decodeToken(token);

      // Get user from the token
      req.user = await User.findById(id);

      next();
    } catch (error) {
      console.log(error);
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "Not authorized",
        });
      });
    }
  }

  if (!token) {
    return new Promise(() => {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "Not authorized, no token",
      });
    });
  }
};

export default protect;
