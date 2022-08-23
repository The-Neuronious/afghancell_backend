import UseCase from "../../../../shared/interfaces/use_case/use_case";
import { LoginUserRequest, LoginUserResponse } from "../entities/login_user";
import AuthRepositoryImpl from "../repositories/auth_repository_impl";

class LoginUseCase implements UseCase<LoginUserResponse, LoginUserRequest> {
  authRepository: AuthRepositoryImpl;
  constructor() {
    this.authRepository = new AuthRepositoryImpl();
  }

  async call(params: LoginUserRequest): Promise<LoginUserResponse> {
    const result = await this.authRepository.login(params);
    return result;
  }
}

export default LoginUseCase;
