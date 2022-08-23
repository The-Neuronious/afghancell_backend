import { ObjectId } from "mongoose";
import UserModel from "../../../../user/data/models/interfaces/user";

interface RechargeModel {
  _id?: ObjectId;
  user: UserModel;
  recharged_user: UserModel;
  amount: number;
}
export default RechargeModel;
