import UserModel from "../../data/models/interfaces/user";
import AuthDataSource from "../../data/data_sources/auth_data_source";
import AuthRepository from "../../data/repositories/auth_repository";
import { LoginUserRequest, LoginUserResponse } from "../entities/login_user";
import { RegisterUserRequest } from "../entities/register_user";
import UserMapper from "../../data/mapper/user_mapper";
import { MessageResponse } from "../entities/message";

class AuthRepositoryImpl implements AuthRepository {
  authDataSource: AuthDataSource;
  userMapper: UserMapper;
  constructor() {
    this.authDataSource = new AuthDataSource();
    this.userMapper = new UserMapper();
  }

  async login(user: LoginUserRequest): Promise<LoginUserResponse> {
    const userResponse: UserModel =
      await this.authDataSource.validateUsernameAndPassword(user);
    return this.userMapper.mapModeltoEntity(userResponse);
  }

  async register(
    user: RegisterUserRequest,
    authUser: UserModel | null
  ): Promise<MessageResponse> {
    await this.authDataSource.checkUserExist(user);
    if (authUser) {
      let role: string = "retailer";
      if (authUser.role === "admin") {
        role = "distributor";
      }
      await this.authDataSource.createUser(user, authUser, role);
    }

    const response: MessageResponse = {
      message: "User registered successfully",
    };

    return response;
  }
}

export default AuthRepositoryImpl;
