"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const Board_1 = __importDefault(require("../Board"));
const Pos_1 = __importDefault(require("../Pos"));
const Piece_1 = require("./Piece");
class Pawn extends Piece_1.Piece {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'pawn';
    }
    yDirection() {
        return this.color === 'white' ? 1 : -1;
    }
    captureSquares() {
        return [this.pos.to({ x: -1, y: this.yDirection() }), this.pos.to({ x: 1, y: this.yDirection() })].filter((square) => square.inBounds());
    }
    controlledSquares(_board) {
        return this.captureSquares();
    }
    isEnPassantMove(newPos, board) {
        return newPos.x !== this.pos.x && newPos.y !== this.pos.y && board.isEmptySquare(newPos);
    }
    isPromotionMove(newPos) {
        const eighthRank = this.color === 'white' ? 7 : 0;
        return newPos.y === eighthRank;
    }
    validMoves(board) {
        const validMoves = [];
        const squaresInFront = {
            1: this.pos.to({ x: 0, y: this.yDirection() }),
            2: this.pos.to({ x: 0, y: 2 * this.yDirection() })
        };
        if (board.pieceAt(squaresInFront[1]) == null) {
            validMoves.push(squaresInFront[1]);
            const secondRank = this.color === 'white' ? 1 : Board_1.default.size - 2;
            if (this.pos.y === secondRank && board.pieceAt(squaresInFront[2]) == null) {
                validMoves.push(squaresInFront[2]);
            }
        }
        this.captureSquares().forEach((square) => {
            const piece = board.pieceAt(square);
            if (piece && piece.color !== this.color) {
                validMoves.push(square);
            }
        });
        // en passant
        const fifthRank = this.color === 'white' ? 4 : 3;
        const lastMove = board.moves.at(-1);
        if (lastMove &&
            this.pos.y === fifthRank &&
            lastMove.pieceName === 'pawn' &&
            lastMove.pieceColor !== this.color &&
            Math.abs(lastMove.newPos.y - lastMove.oldPos.y) === 2 &&
            Math.abs(lastMove.newPos.x - this.pos.x) === 1) {
            validMoves.push(new Pos_1.default(lastMove.oldPos.x, this.pos.y + this.yDirection()));
        }
        return validMoves;
    }
}
exports.Pawn = Pawn;
