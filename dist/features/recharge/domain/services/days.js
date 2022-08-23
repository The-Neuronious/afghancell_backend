"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreviousDay = void 0;
const getPreviousDay = (minusDays = 0) => {
    const date = new Date();
    const previous = new Date(new Date().getTime());
    previous.setDate(date.getDate() - minusDays);
    return previous;
};
exports.getPreviousDay = getPreviousDay;
