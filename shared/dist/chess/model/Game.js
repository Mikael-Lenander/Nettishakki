"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = require("./Board");
const utils_1 = require("./utils");
const pieces_1 = require("./pieces");
class Game {
    constructor(board) {
        if (board) {
            this.board = board;
        }
        else {
            this.board = new Board_1.default();
        }
        this.mate = false;
        this.isCheck = false;
        this.turn = 'white';
    }
    switchTurns() {
        this.turn = (0, utils_1.opponent)(this.turn);
    }
    over() {
        if (this.isCheck && this.allMoves(this.turn).length === 0) {
            return { winner: (0, utils_1.opponent)(this.turn), message: 'checkmate' };
        }
        // Patti, nopein mahdollinen teoreettinen patti tulee 19. siirrolla :)
        if (this.board.moves.length >= 19 && !this.isCheck && this.allMoves(this.turn).length === 0) {
            return { winner: null, message: 'stalemate' };
        }
        if (this.board.insufficientMaterial()) {
            return { winner: null, message: 'insufficient material' };
        }
        return null;
    }
    static legalMoves(board, isCheck, turn, piece) {
        if (turn !== piece.color)
            return [];
        if (isCheck)
            return piece.validMovesInCheck(board);
        if (piece instanceof pieces_1.King)
            return piece.legalMoves(board);
        const pinningPiece = board.pinningPiece(piece);
        if (pinningPiece)
            return piece.validMovesOnPin(board, pinningPiece);
        return piece.validMoves(board);
    }
    makeMove(oldPos, newPos) {
        const piece = this.board.pieceAt(oldPos);
        if (!piece)
            return [];
        const legalMoves = this.getMoves(piece);
        if (newPos.in(legalMoves)) {
            const moves = this.board.movePiece(oldPos, newPos);
            this.switchTurns();
            this.isCheck = this.board.inCheck(this.turn);
            return moves;
        }
        return [];
    }
    getMoves(piece) {
        return Game.legalMoves(this.board, this.isCheck, this.turn, piece);
    }
    static getMoves(game, pos) {
        const { board, isCheck, moves, turn } = game;
        const piece = board[pos.y][pos.x];
        if (!piece)
            return [];
        const fullBoard = Board_1.default.toFullImplementation(board, moves);
        const fullPiece = pieces_1.Piece.toFullImplementation(piece, pos.x, pos.y);
        return Game.legalMoves(fullBoard, isCheck, turn, fullPiece);
    }
    allMoves(color) {
        return this.board.pieces(color)
            .flatMap(piece => this.getMoves(piece));
    }
}
exports.default = Game;
