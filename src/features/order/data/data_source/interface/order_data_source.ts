import UserModel from "../../../../user/data/models/interfaces/user";
import OrderModel from "../../models/interface/order";

interface OrderDS {
  findUserPendingOrder5Min(user: UserModel, topupNo: string): Promise<void>;
  createOrder(order: OrderModel): Promise<OrderModel>;
  getAllCompletedOrders(from: string, to: string): Promise<OrderModel[]>;
  getMyCompletedOrders(
    user: UserModel,
    from: string,
    to: string
  ): Promise<OrderModel[]>;
  getPendingOrders(): Promise<OrderModel[]>;
  orderAction(id: string, action: string): Promise<OrderModel>;
  getNoOfOrdersByDate(date: Date): Promise<number>;
  getTotalOrdersOfUser(user: UserModel): Promise<number>;
  getTotalIncome(user: UserModel): Promise<number>;
}

export default OrderDS;
