import UserModel from "../../../user/data/models/interfaces/user";
import { NoOfOrders } from "../../domain/entities/no_of_orders_per_day";
import OrderModel from "../models/interface/order";

interface OrderRepository {
  createOrder(order: OrderModel): Promise<OrderModel>;
  getPendingOrders(): Promise<OrderModel[]>;
  getAllOrders(from: string, to: string): Promise<OrderModel[]>;
  getMyOrders(user: UserModel, from: string, to: string): Promise<OrderModel[]>;
  orderAction(id: string, action: string): Promise<OrderModel>;
  getNoOfOrdersByWeek(): Promise<NoOfOrders[]>;
  getDistributorCardData(user: UserModel): Promise<DistributorCard>;
}

export default OrderRepository;
