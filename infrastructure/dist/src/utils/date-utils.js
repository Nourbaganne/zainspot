"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndOfPreviousMonth = exports.getStartOfPreviousMonth = void 0;
const date_fns_1 = require("date-fns");
const getStartOfPreviousMonth = () => {
    return (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(new Date(), 1)).toISOString();
};
exports.getStartOfPreviousMonth = getStartOfPreviousMonth;
const getEndOfPreviousMonth = () => {
    return (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(new Date(), 1)).toISOString();
};
exports.getEndOfPreviousMonth = getEndOfPreviousMonth;
//# sourceMappingURL=date-utils.js.map