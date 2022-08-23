import { Request } from "express";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import OrderModel from "../../data/models/interface/order";
import OrderRepositoryImpl from "../repositories/order_repository_impl";

class CreateOrderUseCase implements UseCase<OrderModel, Request> {
  orderRepository: OrderRepositoryImpl;
  constructor() {
    this.orderRepository = new OrderRepositoryImpl();
  }

  async call(params: Request): Promise<OrderModel> {
    let order: OrderModel = {
      user: params.user!,
      amount: params.body.amount,
      operataor: params.body.operator,
      topup_no: params.body.topup_no,
      action: "pending",
    };
    const result = await this.orderRepository.createOrder(order);
    return result;
  }
}

export default CreateOrderUseCase;
