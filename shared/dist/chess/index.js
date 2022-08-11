"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.Board = exports.Pos = void 0;
const Pos_1 = require("./model/Pos");
exports.Pos = Pos_1.default;
const Board_1 = require("./model/Board");
exports.Board = Board_1.default;
const Game_1 = require("./model/Game");
exports.Game = Game_1.default;
__exportStar(require("./model/pieces"), exports);
__exportStar(require("./model/types"), exports);
__exportStar(require("./model/utils"), exports);
