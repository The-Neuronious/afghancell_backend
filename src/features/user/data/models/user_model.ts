import mongoose, { Schema } from "mongoose";
import UserModel from "./interfaces/user";

const userSchema: Schema<UserModel> = new mongoose.Schema(
  {
    user_id: {
      type: Number,
    },
    username: {
      type: String,
      required: [true, "Please add a user name"],
    },
    displayname: {
      type: String,
      required: [true, "Please add a display name"],
    },
    contact: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Please add a password"],
    },
    amount: {
      type: Number,
      default: 0,
    },
    country: {
      type: String,
      required: [true, "Please enter country"],
    },
    state: {
      type: String,
      required: [true, "Please enter state"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      enum: ["admin", "distributor", "retailer"],
      default: "distributor",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserModel>("User", userSchema);

export default User;
