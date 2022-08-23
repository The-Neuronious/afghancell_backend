import express, { Request, Response } from "express";
import { request } from "http";
import admin from "../../../../shared/middlewares/admin_middleware";
import protect from "../../../../shared/middlewares/auth_middleware";
import distributor from "../../../../shared/middlewares/distributors";
import AllOrdersUseCase from "../../domain/use_cases/all_orders";
import CreateOrderUseCase from "../../domain/use_cases/create_order";
import DistributorCardDataUseCase from "../../domain/use_cases/distributor_card_data";
import MyOrdersUseCase from "../../domain/use_cases/my_orders";
import OrdersByWeekUseCase from "../../domain/use_cases/orders_by_week";
import OrderActionUseCase from "../../domain/use_cases/order_action";
import PendingOrderUseCase from "../../domain/use_cases/pending_orders";

export default function orderRouter(
  createOrder: CreateOrderUseCase = new CreateOrderUseCase(),
  pendingOrders: PendingOrderUseCase = new PendingOrderUseCase(),
  allOrders: AllOrdersUseCase = new AllOrdersUseCase(),
  myOrders: MyOrdersUseCase = new MyOrdersUseCase(),
  orderAction: OrderActionUseCase = new OrderActionUseCase(),
  ordersByWeek: OrdersByWeekUseCase = new OrdersByWeekUseCase(),
  distributorCardData: DistributorCardDataUseCase = new DistributorCardDataUseCase()
) {
  const router = express.Router();

  router.post("/create", protect, async (req: Request, res: Response) =>
    res.status(201).json(await createOrder.call(req))
  );

  router.get("/pending", protect, admin, async (req: Request, res: Response) =>
    res.status(200).json(await pendingOrders.call())
  );

  router.get("/all", protect, admin, async (req: Request, res: Response) =>
    res.status(200).json(await allOrders.call(req))
  );

  router.get("/my", protect, async (req: Request, res: Response) =>
    res.status(200).json(await myOrders.call(req))
  );

  router.get("/orders_by_week", protect, async (req: Request, res: Response) =>
    res.status(200).json(await ordersByWeek.call(req))
  );

  router.get(
    "/distributor_card_data",
    protect,
    distributor,
    async (req: Request, res: Response) =>
      res.status(200).json(await distributorCardData.call(req))
  );

  router.put("/action", protect, admin, async (req: Request, res: Response) =>
    res.status(200).json(await orderAction.call(req))
  );

  return router;
}
