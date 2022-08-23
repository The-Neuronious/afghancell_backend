import { Request } from "express";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import UserModel from "../../data/models/interfaces/user";
import UserRepositoryImpl from "../repositories/user_repository_impl";

class GetRetailersUseCase implements UseCase<UserModel[], Request> {
  userRepository: UserRepositoryImpl;
  constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  async call(params: Request): Promise<UserModel[]> {
    const authUser: UserModel | null = params.user;
    let result;
    if(authUser?.role == "distributor") {
      result = await this.userRepository.getRetailers(authUser);
    } else {
      const user = await this.userRepository.getDistributorById(params.body.id)
      result = await this.userRepository.getRetailers(user);
    }
    return result;
  }
}

export default GetRetailersUseCase;
