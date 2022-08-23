import { LoginUserRequest } from "../../domain/entities/login_user";
import AuthDS from "./interfaces/auth_data_source";
import User from "../models/user_model";
import bcrypt from "bcryptjs";
import UserModel from "../models/interfaces/user";
import { RegisterUserRequest } from "../../domain/entities/register_user";
import { hashPassword } from "../../../../shared/functions/hash";
import { AppError, HttpCode } from "../../../../shared/error/app_error";

class AuthDataSource implements AuthDS {
  // Username and Password validation
  async validateUsernameAndPassword(
    user: LoginUserRequest
  ): Promise<UserModel> {
    const findUser = await User.findOne({ username: user.username }).select(
      "+password"
    );
    if (findUser && (await bcrypt.compare(user.password, findUser.password))) {
      return findUser;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Your username or password is incorrect.",
        });
      });
    }
  }

  async checkUserExist(user: RegisterUserRequest): Promise<void> {
    const findUser = await User.findOne({
      $or: [{ username: user.username }, { contact: user.contact }],
    });
    if (findUser) {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "User with this username or phone number already exists",
        });
      });
    }
  }

  async createUser(
    user: RegisterUserRequest,
    authUser: UserModel,
    role: string
  ): Promise<void> {
    const newUser = await User.create({
      username: user.username,
      country: user.country,
      contact: user.contact,
      role: role,
      state: user.state,
      displayname: user.displayname,
      user: authUser,
      user_id: await this.newUserId(),
      password: await hashPassword(user.password),
    });
  }

  async newUserId(): Promise<number> {
    const userbyid = await User.findOne({}, {}, { sort: { createdAt: -1 } });
    let userId: number = 1000;
    if (userbyid) {
      userId = +userbyid.user_id! + 1;
    }
    return userId;
  }
}

export default AuthDataSource;
