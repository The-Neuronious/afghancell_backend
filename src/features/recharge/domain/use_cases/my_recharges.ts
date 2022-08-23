import { Request } from "express";
import { AppError, HttpCode } from "../../../../shared/error/app_error";
import UseCase from "../../../../shared/interfaces/use_case/use_case";
import RechargeModel from "../../data/models/interface/recharge";
import RechargeRepositoryImpl from "../repositories/recharge_repository_impl";

class MyRechargesUseCase implements UseCase<RechargeModel[], Request> {
  rechargeRepository: RechargeRepositoryImpl;
  constructor() {
    this.rechargeRepository = new RechargeRepositoryImpl();
  }

  async call(params: Request): Promise<RechargeModel[]> {
    if (params.query.from == undefined || params.query.to == undefined) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: "Please insert from date and to date",
      });
    }
    const result = await this.rechargeRepository.getMyRecharge(params.user!);
    return result;
  }
}

export default MyRechargesUseCase;
