import { generateAccessToken } from "../../../../shared/functions/token";
import Mapper from "../../../../shared/interfaces/mapper/mapper";
import UserModel from "../models/interfaces/user";
import { LoginUserResponse } from "../../domain/entities/login_user";

class UserMapper implements Mapper<LoginUserResponse, UserModel> {
  mapModeltoEntity(model: UserModel): LoginUserResponse {
    const token: string = generateAccessToken(model._id);

    const user: LoginUserResponse = {
      token: token,
      _id: model._id,
      user_id: model.user_id!,
      displayname: model.displayname,
      username: model.username,
      contact: model.contact,
      country: model.country,
      role: model.role,
      state: model.state,
      amount: model.amount!,
    };

    return user;
  }
}

export default UserMapper;
