import moment from "moment";
import { AppError, HttpCode } from "../../../../shared/error/app_error";
import UserModel from "../../../user/data/models/interfaces/user";
import User from "../../../user/data/models/user_model";
import { get5MinBeforeTime } from "../../domain/services/time";
import OrderModel from "../models/interface/order";
import Order from "../models/order_model";
import OrderDS from "./interface/order_data_source";

class OrderDataSource implements OrderDS {
  async findUserPendingOrder5Min(
    user: UserModel,
    topupNo: string
  ): Promise<void> {
    const today = get5MinBeforeTime();

    const findPendingOrder = await Order.find({
      action: "pending",
      user: user,
      topup_no: topupNo,
      createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf("day").toDate(),
      },
    });

    if (findPendingOrder.length != 0 && findPendingOrder != null) {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "You can not reload on this number before 5 minutes",
        });
      });
    }
  }

  async createOrder(order: OrderModel): Promise<OrderModel> {
    const newOrder = await Order.create({
      amount: order.amount,
      operataor: order.operataor,
      topup_no: order.topup_no,
      user: order.user,
    });

    if (newOrder) {
      await User.findByIdAndUpdate(order.user._id, {
        amount: order.user.amount! - order.amount,
      });

      return newOrder;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Order not created",
        });
      });
    }
  }

  async getAllCompletedOrders(from: string, to: string): Promise<OrderModel[]> {
    const fromDate = moment(from, "DD-MM-YYYY");
    const toDate = moment(to, "DD-MM-YYYY");
    const orders = await Order.find({
      action: { $ne: "pending" },
      createdAt: {
        $gte: moment(fromDate).startOf("day").toDate(),
        $lte: moment(toDate).endOf("day").toDate(),
      },
    }).populate("user");
    if (orders) {
      return orders;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Orders not found",
        });
      });
    }
  }

  async getMyCompletedOrders(
    user: UserModel,
    from: string,
    to: string
  ): Promise<OrderModel[]> {
    const fromDate = moment(from, "DD-MM-YYYY");
    const toDate = moment(to, "DD-MM-YYYY");
    const orders = await Order.find({
      user: user._id,
      createdAt: {
        $gte: moment(fromDate).startOf("day").toDate(),
        $lte: moment(toDate).endOf("day").toDate(),
      },
    }).populate("user");

    if (orders) {
      return orders;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Orders not found",
        });
      });
    }
  }

  async getPendingOrders(): Promise<OrderModel[]> {
    const orders = await Order.find({ action: "pending" }).populate("user");
    if (orders) {
      return orders;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Pending order not found",
        });
      });
    }
  }

  async orderAction(id: string, action: string): Promise<OrderModel> {
    const order = await Order.findById(id).populate("user");

    if (order) {
      order.action = action;
      await order.save();
      if (action != "approve") {
        await User.findByIdAndUpdate(order.user._id, {
          amount: order.user.amount + order.amount,
        });
      }
      return order;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Order not found",
        });
      });
    }
  }

  async getNoOfOrdersByDate(date: Date): Promise<number> {
    const orders = await Order.count({
      createdAt: {
        $gte: moment(date).startOf("day").toDate(),
        $lte: moment(date).endOf("day").toDate(),
      },
    });
    return orders;
  }

  async getTotalOrdersOfUser(user: UserModel): Promise<number> {
    const totalorders = await Order.count({
      action: "approve",
      user,
    });
    return totalorders;
  }

  async getTotalIncome(user: UserModel): Promise<number> {
    const credit = await Order.aggregate([
      {
        $match: {
          action: "approve",
          user: user._id,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    return credit[0]["totalAmount"];
  }
}

export default OrderDataSource;
