import UserDataSource from "../../../user/data/data_sources/user_data_source";
import UserModel from "../../../user/data/models/interfaces/user";
import RechargeDataSource from "../../data/data_source/recharge_data_source";
import RechargeModel from "../../data/models/interface/recharge";
import RechargeRepository from "../../data/repositories/recharge_repository";

class RechargeRepositoryImpl implements RechargeRepository {
  rechargeDataSource: RechargeDataSource;
  userDataSource: UserDataSource;
  constructor() {
    this.rechargeDataSource = new RechargeDataSource();
    this.userDataSource = new UserDataSource();
  }

  async rechargeUser(recharge: RechargeModel): Promise<RechargeModel> {
    if (recharge.user.role != "admin") {
      await this.userDataSource.decreaseUserAmount(
        recharge.user._id.toString(),
        recharge.amount
      );
    }
    await this.userDataSource.increaseUserAmount(
      recharge.recharged_user._id.toString(),
      recharge.amount
    );
    return await this.rechargeDataSource.rechargeUser(recharge);
  }

  async getMyRecharge(user: UserModel, from: string, to: string): Promise<RechargeModel[]> {
    return await this.rechargeDataSource.getMyRecharge(user, from, to);
  }
}

export default RechargeRepositoryImpl;
