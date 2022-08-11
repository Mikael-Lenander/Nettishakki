"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pieces_1 = require("../model/pieces");
const testHelpers_1 = require("./testHelpers");
const Game_1 = require("../model/Game");
const Board_1 = require("../model/Board");
const __1 = require("..");
let game;
beforeEach(() => {
    game = new Game_1.default(Board_1.default.empty());
});
describe('Check', () => {
    describe('when checked by a knight', () => {
        beforeEach(() => {
            game.board.add([
                new pieces_1.Knight('white', 1, 5),
                new pieces_1.King('black', 0, 7),
                new pieces_1.Queen('black', 4, 2),
                new pieces_1.Rook('black', 0, 6)
            ]);
            game.isCheck = true;
            game.turn = 'black';
        });
        test('only valid moves for a queen are to capture or block', () => {
            const queen = game.board.pieceAt(new __1.Pos(4, 2));
            expect((0, testHelpers_1.sortPosArr)(game.getMoves(queen))).toEqual([new __1.Pos(1, 5)]);
        });
        test("a rook has no moves when it can't capture or block", () => {
            const rook = game.board.pieceAt(new __1.Pos(0, 6));
            expect((0, testHelpers_1.sortPosArr)(game.getMoves(rook))).toHaveLength(0);
        });
        test('king has correct escape squares', () => {
            const king = game.board.pieceAt(new __1.Pos(0, 7));
            expect((0, testHelpers_1.sortPosArr)(game.getMoves(king))).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0],
            ]));
        });
    });
    describe('when checked by a bishop', () => {
        beforeEach(() => {
            game.board.add([
                new pieces_1.King('white', 4, 4),
                new pieces_1.Bishop('black', 7, 7),
                new pieces_1.Queen('white', 5, 7),
                new pieces_1.Rook('white', 0, 6),
                new pieces_1.Bishop('white', 0, 0),
                new pieces_1.Rook('black', 1, 3)
            ]);
            game.isCheck = true;
        });
        test('only valid moves for a queen are to capture or block', () => {
            const queen = game.board.pieceAt(new __1.Pos(5, 7));
            const moves = (0, testHelpers_1.sortPosArr)(game.getMoves(queen));
            (0, testHelpers_1.showMoves)(moves, queen.pos);
            expect(moves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 1],
            ]));
        });
        test("only valid moves for a rook are to capture or block", () => {
            const rook = game.board.pieceAt(new __1.Pos(0, 6));
            expect((0, testHelpers_1.sortPosArr)((game.getMoves(rook)))).toEqual([new __1.Pos(6, 6)]);
        });
        test('king has correct escape squares', () => {
            const king = game.board.pieceAt(new __1.Pos(4, 4));
            const moves = (0, testHelpers_1.sortPosArr)(game.getMoves(king));
            (0, testHelpers_1.showMoves)(moves, king.pos);
            expect(moves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ]));
        });
    });
});
