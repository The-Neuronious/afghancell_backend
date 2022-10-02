import OrderModel from "../../data/models/interface/order";
import axios from "axios";

export const approveOrder = async (order: OrderModel): Promise<boolean> => {
  let isApproved: boolean = false;
  const operators = [
    "Salaam",
    "Etisalat Afghanistan",
    "Roshan (TDC)",
    "MTN Afghanistan",
    "AWCC",
  ];
  let operatorId: number = 0;
  operators.forEach((operator, index) => {
    if (operator == order.operataor) operatorId = index + 1;
  });

  await axios
    .get(
      `http://www.prckntr.com.tr/afgan.php?number=${order.topup_no}&operator=${operatorId}&amount=${order.amount}`
    )
    .then(function (response) {
      console.log(operatorId);
      console.log(response.data["result"]);
      if (response.data["result"] == "CHARGED") {
        isApproved = true;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  return isApproved;
};
