"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongRangePiece = exports.Piece = void 0;
const Pos_1 = require("../Pos");
const utils_1 = require("../utils");
const _1 = require(".");
const uuid_1 = require("uuid");
class Piece {
    constructor(color, x, y) {
        this.color = color;
        this.pos = new Pos_1.default(x, y);
        this.id = (0, uuid_1.v4)(); // eslint-disable-line
    }
    isOpponentPiece(piece) {
        return this.color !== piece.color;
    }
    validMovesInCheck(board) {
        const kingPos = board.kingPosition(this.color);
        const kingAttackingPieces = board.kingAttackingPieces((0, utils_1.opponent)(this.color));
        if (kingAttackingPieces.length > 1)
            return [];
        const kingAttackingPiece = kingAttackingPieces[0];
        const captureMove = (pos) => pos.equals(kingAttackingPiece.pos);
        const squaresBetween = kingPos.squaresBetween(kingAttackingPiece.pos);
        switch (kingAttackingPiece.name) {
            case 'knight':
            case 'pawn':
                return this.validMoves(board).filter((pos) => captureMove(pos));
            case 'queen':
            case 'rook':
            case 'bishop':
                return this.validMoves(board).filter((pos) => captureMove(pos) || pos.in(squaresBetween));
            default:
                return [];
        }
    }
    validMovesOnPin(board, pinnningPiece) {
        const squaresBetween = this.pos.squaresBetween(pinnningPiece.pos);
        return this.validMoves(board).filter((pos) => pos.equals(pinnningPiece.pos) || pos.in(squaresBetween));
    }
    static toFullImplementation(piece, x, y) {
        const constructors = {
            pawn: _1.Pawn,
            bishop: _1.Bishop,
            rook: _1.Rook,
            queen: _1.Queen,
            king: _1.King,
            knight: _1.Knight
        };
        return new constructors[piece.name](piece.color, x, y); //eslint-disable-line
    }
}
exports.Piece = Piece;
class LongRangePiece extends Piece {
    constructor(color, x, y) {
        super(color, x, y);
    }
    moves(board, sameColorAllowed) {
        const moves = [];
        this.directions.forEach((direction) => {
            let currentPos = this.pos.to(direction);
            while (currentPos.inBounds() && !board.pieceAt(currentPos)) {
                moves.push(currentPos);
                currentPos = currentPos.to(direction);
            }
            const currentPiece = currentPos.inBounds() && board.pieceAt(currentPos);
            if (currentPiece) {
                !sameColorAllowed && currentPiece.color !== this.color && moves.push(currentPos);
                sameColorAllowed && moves.push(currentPos);
            }
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
exports.LongRangePiece = LongRangePiece;
