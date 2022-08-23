import mongoose, { Schema } from "mongoose";
import OrderModel from "./interface/order";

const orderSchema: Schema<OrderModel> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    operataor: {
      type: String,
      required: [true, "Please add operator"],
    },
    topup_no: {
      type: String,
      required: [true, "Please add topup no"],
    },
    amount: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
    },

    action: {
      type: String,
      enum: ["pending", "approve", "deny"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<OrderModel>("Order", orderSchema);

export default Order;
