import { Request } from "express";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import UserModel from "../../data/models/interfaces/user";
import { MessageResponse } from "../entities/message";
import { RegisterUserRequest } from "../entities/register_user";
import AuthRepositoryImpl from "../repositories/auth_repository_impl";

class RegisterUseCase implements UseCase<MessageResponse, Request> {
  authRepository: AuthRepositoryImpl;
  constructor() {
    this.authRepository = new AuthRepositoryImpl();
  }

  async call(params: Request): Promise<MessageResponse> {
    const authUser: UserModel | null = params.user;
    const result = await this.authRepository.register(params.body, authUser);
    return result;
  }
}

export default RegisterUseCase;
