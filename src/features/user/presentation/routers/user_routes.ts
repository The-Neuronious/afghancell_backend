import express, { Request, Response } from "express";
import admin from "../../../../shared/middlewares/admin_middleware";
import protect from "../../../../shared/middlewares/auth_middleware";
import distributor from "../../../../shared/middlewares/distributors";
import DeleteUserUseCase from "../../domain/use_cases/delete_user";
import GetDistributorsUseCase from "../../domain/use_cases/get_distributors";
import GetRetailersUseCase from "../../domain/use_cases/get_retailers";
import UpdateMeUseCase from "../../domain/use_cases/update_me";
import UpdateUserUseCase from "../../domain/use_cases/update_user";

export default function userRouter(
  getDistributors: GetDistributorsUseCase = new GetDistributorsUseCase(),
  getRetailers: GetRetailersUseCase = new GetRetailersUseCase(),
  updateMe: UpdateMeUseCase = new UpdateMeUseCase(),
  updateUser: UpdateUserUseCase = new UpdateUserUseCase(),
  deleteUser: DeleteUserUseCase = new DeleteUserUseCase(),
) {
  const router = express.Router();

  router.get(
    "/distributors",
    protect,
    admin,
    async (req: Request, res: Response) =>
      res.status(200).json(await getDistributors.call())
  );

  router.get(
    "/retailers",
    protect,
    distributor,
    async (req: Request, res: Response) =>
      res.status(200).json(await getRetailers.call(req))
  );

  router.put(
    "/update_me",
    protect,
    async (req: Request, res: Response) =>
      res.status(200).json(await updateMe.call(req))
  );

  router.put(
    "/update_user",
    protect,
    distributor,
    async (req: Request, res: Response) =>
      res.status(200).json(await updateUser.call(req))
  );

  router.delete(
    "/delete",
    protect,
    distributor,
    async (req: Request, res: Response) =>
      res.status(200).json(await deleteUser.call(req))
  );

  return router;
}
