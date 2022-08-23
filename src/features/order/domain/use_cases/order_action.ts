import { Request } from "express";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import OrderModel from "../../data/models/interface/order";
import OrderRepositoryImpl from "../repositories/order_repository_impl";

class OrderActionUseCase implements UseCase<OrderModel, Request> {
  orderRepository: OrderRepositoryImpl;
  constructor() {
    this.orderRepository = new OrderRepositoryImpl();
  }

  async call(params: Request): Promise<OrderModel> {
    const result = await this.orderRepository.orderAction(
      params.body.id,
      params.body.action
    );
    return result;
  }
}

export default OrderActionUseCase;
