"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get5MinBeforeTime = void 0;
const moment_1 = __importDefault(require("moment"));
const get5MinBeforeTime = () => {
    let dateObj = new Date();
    let currentDateTime = dateObj.toLocaleString("en-GB", { timeZone: "UTC" });
    const currentDay = currentDateTime.substring(0, 2);
    const currentMonth = currentDateTime.substring(3, 5);
    const currentYear = currentDateTime.substring(6, 10);
    const hour = currentDateTime.substring(12, 14);
    const min = currentDateTime.substring(15, 17);
    const sec = currentDateTime.substring(18, 20);
    const today = (0, moment_1.default)(`${currentMonth}-${currentDay}-${currentYear} ${hour}:${min}:${sec} +0000`, "MM-DD-YYYY hh:mm:ss Z");
    var time = moment_1.default.duration("00:05:00");
    today.subtract(time);
    return today;
};
exports.get5MinBeforeTime = get5MinBeforeTime;
