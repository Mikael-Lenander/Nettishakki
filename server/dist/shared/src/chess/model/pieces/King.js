"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const Piece_1 = require("./Piece");
const Pos_1 = __importDefault(require("../Pos"));
const utils_1 = require("../utils");
const _1 = require(".");
class King extends Piece_1.Piece {
    constructor(color, x, y) {
        super(color, x, y);
        this.name = 'king';
        this.directions = [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 0, y: -1 },
            { x: -1, y: -1 },
            { x: -1, y: 0 },
            { x: -1, y: 1 }
        ];
    }
    isCastleMove(move) {
        return this.pos.distance(move) >= 2;
    }
    validMoves(board) {
        const validMoves = [];
        this.directions.forEach((direction) => {
            var _a;
            const currentPos = this.pos.to(direction);
            if (currentPos.inBounds() && ((_a = board.pieceAt(currentPos)) === null || _a === void 0 ? void 0 : _a.color) !== this.color) {
                validMoves.push(currentPos);
            }
        });
        // Linna
        const initialSquare = this.color === 'white' ? new Pos_1.default(4, 0) : new Pos_1.default(4, 7);
        const initialRookSquares = this.color === 'white' ? [new Pos_1.default(0, 0), new Pos_1.default(7, 0)] : [new Pos_1.default(0, 7), new Pos_1.default(7, 7)];
        initialRookSquares.forEach((initialRookSquare) => {
            if (this.pos.equals(initialSquare) &&
                board.moves.every((move) => !move.oldPos.in([initialSquare, initialRookSquare])) &&
                initialSquare.squaresBetween(initialRookSquare).every((square) => board.isEmptySquare(square))) {
                validMoves.push(new Pos_1.default(initialRookSquare.x === 7 ? 6 : 2, initialSquare.y));
            }
        });
        return validMoves;
    }
    legalMoves(board) {
        const opponentControlledSquares = board.controlledSquares((0, utils_1.opponent)(this.color));
        return this.validMoves(board)
            .filter((move) => !move.in(opponentControlledSquares))
            .filter((move) => {
            if (this.isCastleMove(move)) {
                const castleSquares = this.pos.squaresBetween(move).concat(this.pos);
                return castleSquares.every((square) => !square.in(opponentControlledSquares));
            }
            return true;
        });
    }
    validMovesInCheck(board) {
        const validMoves = this.legalMoves(board);
        const illegalMoves = [];
        board.kingAttackingPieces((0, utils_1.opponent)(this.color)).forEach((piece) => {
            if (piece instanceof _1.LongRangePiece && piece.pos.inContactWith(this.pos)) {
                const squareBehindKing = this.pos.to(piece.pos.directionTo(this.pos));
                illegalMoves.push(squareBehindKing);
            }
        });
        return validMoves.filter((move) => !move.in(illegalMoves));
    }
    controlledSquares(board) {
        return this.validMoves(board);
    }
}
exports.King = King;
