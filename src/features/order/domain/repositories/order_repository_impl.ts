import UserModel from "../../../user/data/models/interfaces/user";
import OrderDataSource from "../../data/data_source/order_data_source";
import OrderModel from "../../data/models/interface/order";
import OrderRepository from "../../data/repositories/order_repository";
import { NoOfOrders } from "../entities/no_of_orders_per_day";
import { checkOrderAmount } from "../services/order";
import moment from "moment";
import { getPreviousDay } from "../../../recharge/domain/services/days";

class OrderRepositoryImpl implements OrderRepository {
  orderDataSource: OrderDataSource;
  constructor() {
    this.orderDataSource = new OrderDataSource();
  }

  async getMyOrders(
    user: UserModel,
    from: string,
    to: string
  ): Promise<OrderModel[]> {
    return await this.orderDataSource.getMyCompletedOrders(user, from, to);
  }

  async orderAction(id: string, action: string): Promise<OrderModel> {
    return await this.orderDataSource.orderAction(id, action);
  }

  async getAllOrders(from: string, to: string): Promise<OrderModel[]> {
    return await this.orderDataSource.getAllCompletedOrders(from, to);
  }

  async getPendingOrders(): Promise<OrderModel[]> {
    return await this.orderDataSource.getPendingOrders();
  }

  async createOrder(order: OrderModel): Promise<OrderModel> {
    checkOrderAmount(order.user!.amount!, order.amount);
    await this.orderDataSource.findUserPendingOrder5Min(
      order.user,
      order.topup_no
    );
    return await this.orderDataSource.createOrder(order);
  }

  async getNoOfOrdersByWeek(): Promise<NoOfOrders[]> {
    let orders: NoOfOrders[] = [];
    for (let i = 0; i < 7; i++) {
      const previousDate = getPreviousDay(i);
      let order: NoOfOrders = {
        orders: await this.orderDataSource.getNoOfOrdersByDate(previousDate),
        date: moment(previousDate).format("DD-MM-YYYY"),
      };
      orders.push(order);
    }
    return orders;
  }

  async getDistributorCardData(user: UserModel): Promise<DistributorCard> {
    const orders = await this.orderDataSource.getTotalOrdersOfUser(user);
    const balance = user.amount;
    let income: number = 0;
    if (orders > 0) {
      income = await this.orderDataSource.getTotalIncome(user);
    }
    const res: DistributorCard = {
      orders: orders,
      balance: balance,
      income: income,
    };
    return res;
  }
}

export default OrderRepositoryImpl;
