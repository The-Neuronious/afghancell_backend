import express, { Request, Response } from "express";
import protect from "../../../../shared/middlewares/auth_middleware";
import LoginUseCase from "../../domain/use_cases/login_use_case";
import RegisterUseCase from "../../domain/use_cases/register_use_case";
import distributor from "../../../../shared/middlewares/distributors";

export default function authRouter(
  loginUseCase: LoginUseCase = new LoginUseCase(),
  registerUseCase: RegisterUseCase = new RegisterUseCase()
) {
  const router = express.Router();

  router.post("/login", async (req: Request, res: Response) =>
    res.status(200).json(await loginUseCase.call(req.body))
  );

  router.post(
    "/register",
    protect,
    distributor,
    async (req: Request, res: Response) => {
      res.status(201).json(await registerUseCase.call(req));
    }
  );

  return router;
}
