import { AppError, HttpCode } from "../../../../shared/error/app_error";
import { hashPassword } from "../../../../shared/functions/hash";
import UserModel from "../models/interfaces/user";
import User from "../models/user_model";
import UserDS from "./interfaces/user_data_source";

class UserDataSource implements UserDS {
  async getAllDistributors(): Promise<UserModel[]> {
    const findDistributers = await User.find({ role: "distributor" });
    return findDistributers;
  }

  async getDistributorById(id: String): Promise<UserModel> {
    const findDistributer = await User.findById(id);
    if (findDistributer) {
      return findDistributer;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Distributor with this id does not exist",
        });
      });
    }
  }

  async getAllRetailers(user: UserModel): Promise<UserModel[]> {
    const findRetailers = await User.find({ role: "retailer", user: user });
    return findRetailers;
  }

  async updateUser(user: UserModel): Promise<UserModel> {
    const findUser = await User.findById(user._id).select("+password");
    if (findUser) {
      findUser.username = isEmpty(user.username)
        ? findUser.username
        : user.username;
      findUser.displayname = isEmpty(user.displayname)
        ? findUser.displayname
        : user.displayname;
      findUser.contact = isEmpty(user.contact)
        ? findUser.contact
        : user.contact;
      findUser.password = isEmpty(user.password)
        ? findUser.password
        : await hashPassword(user.password ?? "");
      findUser.amount = isEmpty(user.amount) ? findUser.amount : user.amount;
      findUser.country = isEmpty(user.country)
        ? findUser.country
        : user.country;
      findUser.state = isEmpty(user.state) ? findUser.state : user.state;
      await findUser.save();
      return findUser;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User with this id does not exist",
        });
      });
    }
  }

  async deleteUser(id: string): Promise<void> {
    const findUser = await User.findById(id);
    if (findUser) {
      await findUser.remove();
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User with this id does not exist",
        });
      });
    }
  }

  async increaseUserAmount(id: string, amount: number): Promise<void> {
    await User.findByIdAndUpdate(id, {
      $inc: { amount: +amount },
    });
  }

  async decreaseUserAmount(id: string, amount: number): Promise<void> {
    const user = await User.findById(id);
    if (user) {
      if (user.amount < amount) {
        return new Promise(() => {
          throw new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: "This amount is greater than your balance",
          });
        });
      } else {
        user.amount -= amount;
        await user.save();
      }
    }
  }

  async getUserFromContact(contact: string): Promise<UserModel> {
    const user = await User.findOne({ contact: contact });
    if (user) {
      return user;
    } else {
      return new Promise(() => {
        throw new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User with this contact not found",
        });
      });
    }
  }
}

function isEmpty(item: any): boolean {
  return item == undefined || item == null || item == "";
}

export default UserDataSource;
