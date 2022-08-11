"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Board_1 = require("../model/Board");
const pieces_1 = require("../model/pieces");
const Pos_1 = require("../model/Pos");
const testHelpers_1 = require("./testHelpers");
let board = new Board_1.default();
let oldPos;
let newPos;
let movedPiece;
beforeEach(() => {
    board = new Board_1.default();
});
describe('The board', () => {
    describe('movePiece method', () => {
        beforeEach(() => {
            oldPos = new Pos_1.default(4, 1);
            newPos = new Pos_1.default(4, 3);
            movedPiece = board.pieceAt(oldPos);
            board.movePiece(oldPos, newPos);
        });
        test('the piece changes position', () => {
            board.display();
            expect(board.pieceAt(newPos)).toEqual(movedPiece);
            expect(board.pieceAt(oldPos)).toBeNull();
        });
        test('a move is added to board.moves array', () => {
            expect(board.moves).toHaveLength(1);
            expect(board.moves[0]).toEqual({
                pieceName: movedPiece.name,
                pieceColor: movedPiece.color,
                oldPos,
                newPos
            });
        });
    });
    describe('controlledSquares method', () => {
        test('returns valid squares', () => {
            board = Board_1.default.empty();
            board.add([
                new pieces_1.Queen('white', 2, 2),
                new pieces_1.Bishop('black', 4, 4),
                new pieces_1.Bishop('white', 6, 6),
                new pieces_1.Queen('black', 4, 2),
                new pieces_1.Pawn('white', 6, 1)
            ]);
            const squares = (0, testHelpers_1.sortPosArr)(board.controlledSquares('white'));
            (0, testHelpers_1.showMoves)(squares);
            expect(squares).toEqual((0, testHelpers_1.extractMoves)([
                [1, 0, 1, 0, 1, 0, 0, 0],
                [0, 1, 1, 1, 0, 0, 0, 0],
                [1, 1, 0, 1, 1, 1, 0, 1],
                [0, 1, 1, 1, 0, 0, 0, 0],
                [1, 0, 1, 0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 1, 0, 1],
                [0, 0, 1, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 1, 0, 1],
            ]));
        });
        test('returns valid squares 2', () => {
            board = Board_1.default.empty();
            board.add([
                new pieces_1.Queen('black', 7, 0),
                new pieces_1.Rook('black', 7, 7),
                new pieces_1.King('white', 6, 6),
                new pieces_1.Knight('white', 5, 4),
                new pieces_1.Pawn('white', 6, 3),
                new pieces_1.Pawn('black', 7, 4)
            ]);
            const squares = (0, testHelpers_1.sortPosArr)(board.controlledSquares('white'));
            (0, testHelpers_1.showMoves)(squares);
            expect(squares).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 1, 0],
                [0, 0, 0, 1, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 1, 0, 1],
                [0, 0, 0, 1, 0, 1, 1, 1],
                [0, 0, 0, 0, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 1, 1, 1],
            ]));
        });
    });
    describe('pinningPiece method', () => {
        beforeEach(() => {
            board = Board_1.default.empty();
        });
        test('correctly returns the pinned piece', () => {
            const pinnedPiece = new pieces_1.Pawn('white', 4, 5);
            const pinningPiece = new pieces_1.Bishop('black', 1, 2);
            board.add([
                new pieces_1.King('white', 5, 6),
                pinnedPiece,
                new pieces_1.Queen('black', 0, 1),
                pinningPiece
            ]);
            expect(board.pinningPiece(pinnedPiece)).toEqual(pinningPiece);
        });
        test('correctly returns the pinned piece 2', () => {
            const pinnedPiece = new pieces_1.Queen('white', 1, 4);
            const pinningPiece = new pieces_1.Rook('black', 0, 4);
            board.add([
                new pieces_1.King('white', 6, 4),
                pinnedPiece,
                pinningPiece
            ]);
            expect(board.pinningPiece(pinnedPiece)).toEqual(pinningPiece);
        });
        test('correctly returns null when no piece is pinned', () => {
            const notPinnedPiece = new pieces_1.Pawn('white', 4, 5);
            const notPinnedPiece2 = new pieces_1.Pawn('white', 4, 6);
            board.add([
                new pieces_1.Queen('black', 4, 0),
                notPinnedPiece,
                notPinnedPiece2,
                new pieces_1.King('white', 4, 7),
            ]);
            expect(board.pinningPiece(notPinnedPiece)).toBeNull();
            expect(board.pinningPiece(notPinnedPiece2)).toBeNull();
        });
    });
});
