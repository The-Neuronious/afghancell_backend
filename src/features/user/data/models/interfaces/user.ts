import { ObjectId } from "mongoose";

interface UserModel {
  _id: ObjectId;
  user_id?: number;
  username: string;
  displayname: string;
  contact: string;
  password: string;
  amount: number;
  country: string;
  state: string;
  user: UserModel;
  role: string;
}
export default UserModel;
