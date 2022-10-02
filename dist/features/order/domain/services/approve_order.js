"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveOrder = void 0;
const axios_1 = __importDefault(require("axios"));
const approveOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    let isApproved = false;
    const operators = [
        "Salaam",
        "Etisalat Afghanistan",
        "Roshan (TDC)",
        "MTN Afghanistan",
        "AWCC",
    ];
    let operatorId = 0;
    operators.forEach((operator, index) => {
        if (operator == order.operataor)
            operatorId = index + 1;
    });
    yield axios_1.default
        .get(`http://www.prckntr.com.tr/afgan.php?number=${order.topup_no}&operator=${operatorId}&amount=${order.amount}`)
        .then(function (response) {
        if (response.data["result"] == "CHARGED") {
            isApproved = true;
        }
    })
        .catch(function (error) {
        console.log(error);
    });
    return isApproved;
});
exports.approveOrder = approveOrder;
