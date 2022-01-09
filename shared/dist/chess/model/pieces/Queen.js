"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queen = void 0;
const Piece_1 = require("./Piece");
class Queen extends Piece_1.LongRangePiece {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'queen';
        this.directions = [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 0, y: -1 },
            { x: -1, y: -1 },
            { x: -1, y: 0 },
            { x: -1, y: 1 },
        ];
    }
}
exports.Queen = Queen;
