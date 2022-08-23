import { LoginUserRequest } from "../../../domain/entities/login_user";
import { RegisterUserRequest } from "../../../domain/entities/register_user";
import UserModel from "../../models/interfaces/user";

interface AuthDS {
  validateUsernameAndPassword(user: LoginUserRequest): Promise<UserModel>;
  checkUserExist(user: RegisterUserRequest): Promise<void>;
  createUser(
    user: RegisterUserRequest,
    authUser: UserModel,
    role: string
  ): Promise<void>;
  newUserId(): Promise<number>;
}

export default AuthDS;
