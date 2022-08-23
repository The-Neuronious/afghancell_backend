import { Request } from "express";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import UserModel from "../../data/models/interfaces/user";
import { MessageResponse } from "../entities/message";
import UserRepositoryImpl from "../repositories/user_repository_impl";

class DeleteUserUseCase implements UseCase<MessageResponse, Request> {
  userRepository: UserRepositoryImpl;
  constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  async call(params: Request): Promise<MessageResponse> {
  
    const result = await this.userRepository.deleteUser(params.body.id);
    return result;
  }
}

export default DeleteUserUseCase;
