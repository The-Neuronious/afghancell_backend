import {
  LoginUserRequest,
  LoginUserResponse,
} from "../../domain/entities/login_user";
import { MessageResponse } from "../../domain/entities/message";
import { RegisterUserRequest } from "../../domain/entities/register_user";
import UserModel from "../models/interfaces/user";

interface UserRepository {
  getDistributors(): Promise<UserModel[]>;
  getDistributorById(id: String): Promise<UserModel>;
  getRetailers(distributor: UserModel): Promise<UserModel[]>;
  updateUser(user: UserModel): Promise<UserModel>;
  deleteUser(id: string): Promise<MessageResponse>;
}

export default UserRepository;
