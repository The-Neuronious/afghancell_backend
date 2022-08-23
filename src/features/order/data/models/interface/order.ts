import { ObjectId } from "mongoose";
import UserModel from "../../../../user/data/models/interfaces/user";

interface OrderModel {
  _id?: ObjectId;
  user: UserModel;
  operataor: string;
  topup_no: string;
  amount: number;
  date?: string;
  action: string;
}
export default OrderModel;
