import mongoose, { Schema } from "mongoose";
import RechargeModel from "./interface/recharge";

const rechargeSchema: Schema<RechargeModel> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    recharged_user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: [true, "Please add amount"],
    },
  },
  {
    timestamps: true,
  }
);

const Recharge = mongoose.model<RechargeModel>("Recharge", rechargeSchema);

export default Recharge;
