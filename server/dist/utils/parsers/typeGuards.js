"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isColor = exports.isString = void 0;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const isColor = (color) => {
    return (0, exports.isString)(color) && ['white', 'black'].includes(color);
};
exports.isColor = isColor;
