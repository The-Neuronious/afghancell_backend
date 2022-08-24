import { AppError, HttpCode } from "../../../../shared/error/app_error";
import UserModel from "../../../user/data/models/interfaces/user";
import RechargeModel from "../models/interface/recharge";
import Recharge from "../models/recharge_model";
import RechargeDS from "./interface/recharge_data_source";
import moment from "moment";

class RechargeDataSource implements RechargeDS {
  async rechargeUser(recharge: RechargeModel): Promise<RechargeModel> {
    const newRecharge = await Recharge.create({
      amount: recharge.amount,
      user: recharge.user,
      recharged_user: recharge.recharged_user,
    });
    if (newRecharge) {
      return newRecharge;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not recharged",
        });
      });
    }
  }

  async getMyRecharge(
    user: UserModel,
    from: string,
    to: string
  ): Promise<RechargeModel[]> {
    const fromDate = moment(from, "DD-MM-YYYY");
    const toDate = moment(to, "DD-MM-YYYY");
    const recharges = await Recharge.find({
      user: user,
      createdAt: {
        $gte: moment(fromDate).startOf("day").toDate(),
        $lte: moment(toDate).endOf("day").toDate(),
      },
    }).populate("recharged_user");

    if (recharges) {
      return recharges;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Recharge not found",
        });
      });
    }
  }
}

export default RechargeDataSource;
