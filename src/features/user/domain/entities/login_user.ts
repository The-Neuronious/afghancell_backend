import { ObjectId } from "mongoose";

export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
  _id: ObjectId;
  user_id: number;
  displayname: string;
  username: string;
  contact: string;
  country: string;
  role: string;
  state: string;
  amount: number;
}
