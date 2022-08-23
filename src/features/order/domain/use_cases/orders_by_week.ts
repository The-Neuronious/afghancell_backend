import { Request } from "express";
import { AppError, HttpCode } from "../../../../shared/error/app_error";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import OrderModel from "../../data/models/interface/order";
import { NoOfOrders } from "../entities/no_of_orders_per_day";
import OrderRepositoryImpl from "../repositories/order_repository_impl";

class OrdersByWeekUseCase implements UseCase<NoOfOrders[], Request> {
  orderRepository: OrderRepositoryImpl;
  constructor() {
    this.orderRepository = new OrderRepositoryImpl();
  }

  async call(params: Request): Promise<NoOfOrders[]> {
    const result = await this.orderRepository.getNoOfOrdersByWeek();
    return result;
  }
}

export default OrdersByWeekUseCase;
