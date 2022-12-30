"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseString = void 0;
const typeGuards_1 = require("./typeGuards");
const parseString = (str, paramName) => {
    if (!str || !(0, typeGuards_1.isString)(str)) {
        throw new Error(`Incorrect or missing ${paramName}: ${str}`);
    }
    return str;
};
exports.parseString = parseString;
