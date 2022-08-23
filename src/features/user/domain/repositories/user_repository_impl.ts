import UserDataSource from "../../data/data_sources/user_data_source";
import UserMapper from "../../data/mapper/user_mapper";
import UserModel from "../../data/models/interfaces/user";
import UserRepository from "../../data/repositories/user_repository";
import { MessageResponse } from "../entities/message";

class UserRepositoryImpl implements UserRepository {
  userDataSource: UserDataSource;
  userMapper: UserMapper;
  constructor() {
    this.userDataSource = new UserDataSource();
    this.userMapper = new UserMapper();
  }

  async getDistributors(): Promise<UserModel[]> {
    return await this.userDataSource.getAllDistributors();
  }

  async getDistributorById(id: string): Promise<UserModel> {
    return await this.userDataSource.getDistributorById(id);
  }

  async getRetailers(distributor: UserModel): Promise<UserModel[]> {
    return await this.userDataSource.getAllRetailers(distributor);
  }

  async updateUser(user: UserModel): Promise<UserModel> {
      return await this.userDataSource.updateUser(user);
  }

  async deleteUser(id: string): Promise<MessageResponse> {
    await this.userDataSource.deleteUser(id);
    const response: MessageResponse = {
      message: "User deleted successfully",
    };
    return response;
  }
}

export default UserRepositoryImpl;
