import UseCase from "../../../../shared/interfaces/use_case/use_case";
import UserModel from "../../data/models/interfaces/user";
import UserRepositoryImpl from "../repositories/user_repository_impl";

class GetDistributorsUseCase implements UseCase<UserModel[], void> {
  userRepository: UserRepositoryImpl;
  constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  async call(params: void): Promise<UserModel[]> {
    const result = await this.userRepository.getDistributors();
    return result;
  }
}

export default GetDistributorsUseCase;
