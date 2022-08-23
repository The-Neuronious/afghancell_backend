import {
  LoginUserRequest,
  LoginUserResponse,
} from "../../domain/entities/login_user";
import { MessageResponse } from "../../domain/entities/message";
import { RegisterUserRequest } from "../../domain/entities/register_user";
import UserModel from "../models/interfaces/user";

interface AuthRepository {
  login(user: LoginUserRequest): Promise<LoginUserResponse>;
  register(
    user: RegisterUserRequest,
    authUser: UserModel | null
  ): Promise<MessageResponse>;
}

export default AuthRepository;
