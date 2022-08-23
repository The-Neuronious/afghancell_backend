import express, { Request, Response } from "express";
import admin from "../../../../shared/middlewares/admin_middleware";
import protect from "../../../../shared/middlewares/auth_middleware";
import distributor from "../../../../shared/middlewares/distributors";
import MyRechargesUseCase from "../../domain/use_cases/my_recharges";
import RechargeUserUseCase from "../../domain/use_cases/recharge_user";

export default function rechargeRouter(
  rechargeUser: RechargeUserUseCase = new RechargeUserUseCase(),
  myRecharges: MyRechargesUseCase = new MyRechargesUseCase()
) {
  const router = express.Router();

  router.post("/", protect, distributor, async (req: Request, res: Response) =>
    res.status(201).json(await rechargeUser.call(req))
  );

  router.get(
    "/get",
    protect,
    distributor,
    async (req: Request, res: Response) =>
      res.status(200).json(await myRecharges.call(req))
  );

  return router;
}
