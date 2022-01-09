"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
const Piece_1 = require("./Piece");
class Knight extends Piece_1.Piece {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'knight';
        this.directions = [
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 2, y: -1 },
            { x: 1, y: -2 },
            { x: -1, y: -2 },
            { x: -2, y: -1 },
            { x: -2, y: 1 },
            { x: -1, y: 2 },
        ];
    }
    moves(board, sameColorAllowed) {
        const moves = [];
        this.directions.forEach(direction => {
            const currentPos = this.pos.to(direction);
            if (!currentPos.inBounds())
                return;
            const currentPiece = board.pieceAt(currentPos);
            if (!currentPiece || currentPiece.color !== this.color) {
                moves.push(currentPos);
            }
            sameColorAllowed && moves.push(currentPos);
        });
        return moves;
    }
    validMoves(board) {
        return this.moves(board, false);
    }
    controlledSquares(board) {
        return this.moves(board, true);
    }
}
exports.Knight = Knight;
