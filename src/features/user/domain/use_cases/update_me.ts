import { Request } from "express";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import UserModel from "../../data/models/interfaces/user";
import UserRepositoryImpl from "../repositories/user_repository_impl";

class UpdateMeUseCase implements UseCase<UserModel, Request> {
  userRepository: UserRepositoryImpl;
  constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  async call(params: Request): Promise<UserModel> {
    let user: UserModel = {
      _id: params.user?._id!,
      username: params.body.username,
      displayname: params.body?.displayname,
      amount: params.body.amount,
      contact: params.body.contact,
      country: params.body.country,
      password: params.body.password,
      role: params.body.role,
      state: params.body.state,
      user: params.user!,
    };
    const result = await this.userRepository.updateUser(user);
    return result;
  }
}

export default UpdateMeUseCase;
