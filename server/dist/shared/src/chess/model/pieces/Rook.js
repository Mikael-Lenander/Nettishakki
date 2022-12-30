"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rook = void 0;
const Piece_1 = require("./Piece");
class Rook extends Piece_1.LongRangePiece {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'rook';
        this.directions = [
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: -1, y: 0 }
        ];
    }
}
exports.Rook = Rook;
