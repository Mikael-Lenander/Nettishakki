"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pieces_1 = require("../../model/pieces");
const Board_1 = require("../../model/Board");
const testHelpers_1 = require("../testHelpers");
const __1 = require("../..");
let board = Board_1.default.empty();
beforeEach(() => {
    board = Board_1.default.empty();
});
describe('Pawn', () => {
    describe('a white pawn', () => {
        test('has correct valid moves in the opening', () => {
            board = new Board_1.default();
            const whitePawn = board.pieceAt(new __1.Pos(0, 1));
            const whiteMoves = (0, testHelpers_1.sortPosArr)(whitePawn.validMoves(board));
            (0, testHelpers_1.showMoves)(whiteMoves, whitePawn.pos);
            expect(whiteMoves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]));
        });
        test('has correct capturing moves', () => {
            const whitePawn = new pieces_1.Pawn('white', 2, 2);
            board.add([
                whitePawn,
                new pieces_1.Pawn('white', 1, 3),
                new pieces_1.Pawn('black', 3, 3),
                new pieces_1.Pawn('white', 6, 4)
            ]);
            const whiteMoves = (0, testHelpers_1.sortPosArr)(whitePawn.validMoves(board));
            (0, testHelpers_1.showMoves)(whiteMoves, whitePawn.pos);
            expect(whiteMoves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]));
        });
        test("can't move when blocked by a piece", () => {
            const whitePawn = new pieces_1.Pawn('white', 2, 2);
            board.add([
                whitePawn,
                new pieces_1.Pawn('white', 2, 3),
                new pieces_1.Pawn('black', 3, 3),
                new pieces_1.Pawn('white', 7, 4)
            ]);
            const whiteMoves = (0, testHelpers_1.sortPosArr)(whitePawn.validMoves(board));
            (0, testHelpers_1.showMoves)(whiteMoves, whitePawn.pos);
            expect(whiteMoves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]));
        });
        test('can capture on en passant', () => {
            const whitePawn = new pieces_1.Pawn('white', 7, 4);
            board.add([
                whitePawn,
                new pieces_1.Pawn('black', 6, 6),
            ]);
            board.movePiece(new __1.Pos(6, 6), new __1.Pos(6, 4));
            const whiteMoves = (0, testHelpers_1.sortPosArr)(whitePawn.validMoves(board));
            (0, testHelpers_1.showMoves)(whiteMoves, whitePawn.pos);
            expect(whiteMoves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]));
        });
    });
    describe('a black pawn', () => {
        test('has correct valid moves in the opening', () => {
            board = new Board_1.default();
            const blackPawn = board.pieceAt(new __1.Pos(6, 6));
            board.display();
            const blackMoves = (0, testHelpers_1.sortPosArr)(blackPawn.validMoves(board));
            (0, testHelpers_1.showMoves)(blackMoves, blackPawn.pos);
            expect(blackMoves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]));
        });
        test('has correct capturing moves', () => {
            const blackPawn = new pieces_1.Pawn('black', 7, 5);
            board.add([
                blackPawn,
                new pieces_1.Pawn('white', 1, 3),
                new pieces_1.Pawn('black', 3, 3),
                new pieces_1.Pawn('white', 6, 4)
            ]);
            const blackMoves = (0, testHelpers_1.sortPosArr)(blackPawn.validMoves(board));
            (0, testHelpers_1.showMoves)(blackMoves, blackPawn.pos);
            expect(blackMoves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]));
        });
        test("can't move when blocked by a piece", () => {
            const blackPawn = new pieces_1.Pawn('black', 7, 5);
            board.add([
                blackPawn,
                new pieces_1.Pawn('white', 2, 3),
                new pieces_1.Pawn('black', 3, 3),
                new pieces_1.Pawn('white', 7, 4)
            ]);
            const blackMoves = (0, testHelpers_1.sortPosArr)(blackPawn.validMoves(board));
            (0, testHelpers_1.showMoves)(blackMoves, blackPawn.pos);
            expect(blackMoves).toHaveLength(0);
        });
        test('can capture on en passant', () => {
            const blackPawn = new pieces_1.Pawn('black', 1, 3);
            board.add([
                blackPawn,
                new pieces_1.Pawn('white', 2, 1),
            ]);
            board.movePiece(new __1.Pos(2, 1), new __1.Pos(2, 3));
            const blackMoves = (0, testHelpers_1.sortPosArr)(blackPawn.validMoves(board));
            (0, testHelpers_1.showMoves)(blackMoves, blackPawn.pos);
            expect(blackMoves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]));
        });
    });
});
