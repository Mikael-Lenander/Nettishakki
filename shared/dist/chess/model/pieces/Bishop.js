"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bishop = void 0;
const Piece_1 = require("./Piece");
class Bishop extends Piece_1.LongRangePiece {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'bishop';
        this.directions = [
            { x: 1, y: 1 },
            { x: 1, y: -1 },
            { x: -1, y: -1 },
            { x: -1, y: 1 }
        ];
    }
}
exports.Bishop = Bishop;
