import UserModel from "../../../user/data/models/interfaces/user";
import RechargeModel from "../models/interface/recharge";

interface RechargeRepository {
  rechargeUser(recharge: RechargeModel): Promise<RechargeModel>;
  getMyRecharge(user: UserModel): Promise<RechargeModel[]>;
}

export default RechargeRepository;
