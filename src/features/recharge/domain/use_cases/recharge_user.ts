import { Request } from "express";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import UserDataSource from "../../../user/data/data_sources/user_data_source";
import RechargeModel from "../../data/models/interface/recharge";
import RechargeRepositoryImpl from "../repositories/recharge_repository_impl";

class RechargeUserUseCase implements UseCase<RechargeModel, Request> {
  rechargeRepository: RechargeRepositoryImpl;
  userDataSource: UserDataSource;
  constructor() {
    this.rechargeRepository = new RechargeRepositoryImpl();
    this.userDataSource = new UserDataSource();
  }

  async call(params: Request): Promise<RechargeModel> {
    console.log(params.body.amount);
    const recharge: RechargeModel = {
      amount: params.body.amount,
      user: params.user!,
      recharged_user: await this.userDataSource.getUserFromContact(
        params.body.contact
      ),
    };
    const result = await this.rechargeRepository.rechargeUser(recharge);
    return result;
  }
}

export default RechargeUserUseCase;
