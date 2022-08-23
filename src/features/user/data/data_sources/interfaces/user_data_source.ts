import { LoginUserRequest } from "../../../domain/entities/login_user";
import { MessageResponse } from "../../../domain/entities/message";
import { RegisterUserRequest } from "../../../domain/entities/register_user";
import UserModel from "../../models/interfaces/user";

interface UserDS {
  getAllDistributors(): Promise<UserModel[]>;
  getDistributorById(id: String): Promise<UserModel>;
  getAllRetailers(user: UserModel): Promise<UserModel[]>;
  updateUser(user: UserModel): Promise<UserModel>;
  deleteUser(id: string): Promise<void>;
  increaseUserAmount(id: string, amount: number): Promise<void>;
  decreaseUserAmount(id: string, amount: number): Promise<void>;
  getUserFromContact(contact: string): Promise<UserModel>;
}

export default UserDS;
