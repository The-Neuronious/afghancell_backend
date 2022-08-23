import { Request } from "express";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import OrderModel from "../../data/models/interface/order";
import OrderRepositoryImpl from "../repositories/order_repository_impl";

class PendingOrderUseCase implements UseCase<OrderModel[], void> {
  orderRepository: OrderRepositoryImpl;
  constructor() {
    this.orderRepository = new OrderRepositoryImpl();
  }

  async call(params: void): Promise<OrderModel[]> {
   
    const result = await this.orderRepository.getPendingOrders();
    return result;
  }
}

export default PendingOrderUseCase;
