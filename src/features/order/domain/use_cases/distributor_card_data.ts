import { Request } from "express";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import OrderRepositoryImpl from "../repositories/order_repository_impl";

class DistributorCardDataUseCase implements UseCase<DistributorCard, Request> {
  orderRepository: OrderRepositoryImpl;
  constructor() {
    this.orderRepository = new OrderRepositoryImpl();
  }

  async call(params: Request): Promise<DistributorCard> {
    const result = await this.orderRepository.getDistributorCardData(
      params.user!
    );
    return result;
  }
}

export default DistributorCardDataUseCase;
