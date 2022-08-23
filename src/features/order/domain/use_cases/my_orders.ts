import { Request } from "express";
import { AppError, HttpCode } from "../../../../shared/error/app_error";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import OrderModel from "../../data/models/interface/order";
import OrderRepositoryImpl from "../repositories/order_repository_impl";

class MyOrdersUseCase implements UseCase<OrderModel[], Request> {
  orderRepository: OrderRepositoryImpl;
  constructor() {
    this.orderRepository = new OrderRepositoryImpl();
  }

  async call(params: Request): Promise<OrderModel[]> {
    if (params.query.from == undefined || params.query.to == undefined) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Please insert from date and to date",
      });
    }
    const result = await this.orderRepository.getMyOrders(
      params.user!,
      params.query.from.toString(),
      params.query.to.toString()
    );
    return result;
  }
}

export default MyOrdersUseCase;
