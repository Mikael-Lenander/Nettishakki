"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pieces_1 = require("./pieces");
const Pos_1 = require("./Pos");
const utils_1 = require("./utils");
const lodash_1 = require("lodash");
class Board {
    constructor(board) {
        if (board) {
            this.board = board;
        }
        else {
            this.board = Board.createBoard();
        }
        this.moves = [];
    }
    pieceAt(pos) {
        return this.board[pos.y][pos.x];
    }
    isEmptySquare(pos) {
        return this.pieceAt(pos) == null;
    }
    setPiece(piece, oldPos, newPos, saveMove = true) {
        this.board[newPos.y][newPos.x] = piece;
        this.board[oldPos.y][oldPos.x] = null;
        piece.pos = newPos;
        const move = {
            pieceName: piece.name,
            pieceColor: piece.color,
            pieceId: piece.id,
            oldPos,
            newPos
        };
        if (saveMove)
            this.moves.push(move);
        return move;
    }
    castle(king, oldPos, newPos) {
        const kingMove = this.setPiece(king, oldPos, newPos);
        const rook = this.pieceAt(new Pos_1.default(newPos.x === 6 ? 7 : 0, king.pos.y));
        const rookMove = this.setPiece(rook, rook.pos, new Pos_1.default(rook.pos.x === 7 ? 5 : 3, rook.pos.y), false);
        return [kingMove, rookMove];
    }
    enPassant(piece, oldPos, newPos) {
        const pawnMove = this.setPiece(piece, oldPos, newPos);
        const captureSquare = new Pos_1.default(newPos.x, oldPos.y);
        const capturedPiece = this.pieceAt(captureSquare);
        this.board[captureSquare.y][captureSquare.x] = null;
        return [
            pawnMove,
            {
                pieceName: capturedPiece.name,
                pieceColor: capturedPiece.color,
                pieceId: capturedPiece.id,
                oldPos: captureSquare,
                newPos: captureSquare
            }
        ];
    }
    movePiece(oldPos, newPos) {
        const piece = this.pieceAt(oldPos);
        if (!piece)
            return [];
        if (piece instanceof pieces_1.King && piece.isCastleMove(newPos)) {
            return this.castle(piece, oldPos, newPos);
        }
        if (piece instanceof pieces_1.Pawn && piece.isEnPassantMove(newPos, this)) {
            return this.enPassant(piece, oldPos, newPos);
        }
        if (piece instanceof pieces_1.Pawn && piece.isPromotionMove(newPos)) {
            return [this.setPiece(new pieces_1.Queen(piece.color, newPos.x, newPos.y), oldPos, newPos)];
        }
        return [this.setPiece(piece, oldPos, newPos)];
    }
    kingPosition(color) {
        return this.board.flat().find(piece => (piece === null || piece === void 0 ? void 0 : piece.name) === 'king' && piece.color === color).pos;
    }
    pieces(color) {
        return this.board.flat().filter(piece => piece && piece.color === color);
    }
    longRangePieces(color) {
        return this.pieces(color).filter(piece => ['rook', 'queen', 'bishop'].includes(piece.name));
    }
    kingAttackingPieces(color) {
        return this.pieces(color).filter(piece => this.kingPosition((0, utils_1.opponent)(color)).in(piece.validMoves(this)));
    }
    pinningPiece(pinnedPiece) {
        const kingPos = this.kingPosition(pinnedPiece.color);
        const squaresBetween = kingPos.squaresBetween(pinnedPiece.pos);
        if (!kingPos.inContactWith(pinnedPiece.pos))
            return null;
        if (squaresBetween.some(pos => this.pieceAt(pos)))
            return null;
        return (this.longRangePieces((0, utils_1.opponent)(pinnedPiece.color)).find(piece => {
            const squaresBetweenKing = piece.pos.squaresBetween(kingPos);
            return pinnedPiece.pos.in(squaresBetweenKing) && piece.pos.squaresBetween(pinnedPiece.pos).every(pos => !this.pieceAt(pos));
        }) || null);
    }
    inCheck(color) {
        const kingPos = this.kingPosition(color);
        return this.pieces((0, utils_1.opponent)(color)).some(piece => kingPos.in(piece.controlledSquares(this)));
    }
    controlledSquares(color) {
        return (0, lodash_1.uniqWith)(this.pieces(color).flatMap(piece => piece.controlledSquares(this)), (a, b) => a.equals(b));
    }
    insufficientMaterial() {
        if (this.moves.length < 35)
            return false;
        const whitePieces = this.pieces('white');
        const blackPieces = this.pieces('black');
        const allPieces = whitePieces.concat(blackPieces);
        return (allPieces.length <= 2 ||
            (allPieces.length === 3 && allPieces.some(piece => piece.name === 'bishop' || piece.name === 'knight')) ||
            (allPieces.length === 4 &&
                whitePieces.some(piece => piece.name === 'bishop') &&
                blackPieces.some(piece => piece.name === 'bishop') &&
                whitePieces.find(piece => piece.name === 'bishop').color === blackPieces.find(piece => piece.name === 'bishop').color));
    }
    toSimple() {
        return this.board.map(row => row.map(piece => piece
            ? {
                name: piece.name,
                color: piece.color,
                id: piece.id
            }
            : null));
    }
    static simple() {
        return new Board(Board.createBoard()).toSimple();
    }
    static toFullImplementation(board, moves) {
        const constructors = {
            pawn: pieces_1.Pawn,
            bishop: pieces_1.Bishop,
            rook: pieces_1.Rook,
            queen: pieces_1.Queen,
            king: pieces_1.King,
            knight: pieces_1.Knight
        };
        const fullBoard = board.map((row, y) => row.map((piece, x) => (piece ? new constructors[piece.name](piece.color, x, y) : null)));
        const newBoard = new Board(fullBoard);
        newBoard.moves = moves.map(move => ({
            pieceName: move.pieceName,
            pieceColor: move.pieceColor,
            pieceId: move.pieceId,
            oldPos: Pos_1.default.new(move.oldPos),
            newPos: Pos_1.default.new(move.newPos)
        }));
        return newBoard;
    }
    // Vain testaukseen
    add(pieces) {
        if (pieces instanceof Array) {
            pieces.forEach(piece => {
                this.board[piece.pos.y][piece.pos.x] = piece;
            });
        }
        else {
            this.board[pieces.pos.y][pieces.pos.x] = pieces;
        }
    }
    // Vain testaukseen
    display() {
        console.table(this.board.map(row => row.map(piece => (piece ? `${piece.name.substring(0, 2)}(${piece.color.substring(0, 1)} (${piece.pos.x}, ${piece.pos.y}))` : 0) //eslint-disable-line
        )));
    }
    // Vain testaukseen
    static empty() {
        const newBoard = new Board();
        newBoard.board = [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null]
        ];
        return newBoard;
    }
    // Palauttaa laudan avausasemassa
    static createBoard() {
        return [
            [
                new pieces_1.Rook('white', 0, 0),
                new pieces_1.Knight('white', 1, 0),
                new pieces_1.Bishop('white', 2, 0),
                new pieces_1.Queen('white', 3, 0),
                new pieces_1.King('white', 4, 0),
                new pieces_1.Bishop('white', 5, 0),
                new pieces_1.Knight('white', 6, 0),
                new pieces_1.Rook('white', 7, 0)
            ],
            [
                new pieces_1.Pawn('white', 0, 1),
                new pieces_1.Pawn('white', 1, 1),
                new pieces_1.Pawn('white', 2, 1),
                new pieces_1.Pawn('white', 3, 1),
                new pieces_1.Pawn('white', 4, 1),
                new pieces_1.Pawn('white', 5, 1),
                new pieces_1.Pawn('white', 6, 1),
                new pieces_1.Pawn('white', 7, 1)
            ],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [
                new pieces_1.Pawn('black', 0, 6),
                new pieces_1.Pawn('black', 1, 6),
                new pieces_1.Pawn('black', 2, 6),
                new pieces_1.Pawn('black', 3, 6),
                new pieces_1.Pawn('black', 4, 6),
                new pieces_1.Pawn('black', 5, 6),
                new pieces_1.Pawn('black', 6, 6),
                new pieces_1.Pawn('black', 7, 6)
            ],
            [
                new pieces_1.Rook('black', 0, 7),
                new pieces_1.Knight('black', 1, 7),
                new pieces_1.Bishop('black', 2, 7),
                new pieces_1.Queen('black', 3, 7),
                new pieces_1.King('black', 4, 7),
                new pieces_1.Bishop('black', 5, 7),
                new pieces_1.Knight('black', 6, 7),
                new pieces_1.Rook('black', 7, 7)
            ]
        ];
    }
}
exports.default = Board;
Board.size = 8;
