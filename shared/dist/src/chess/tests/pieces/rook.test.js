"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pieces_1 = require("../../model/pieces");
const Board_1 = require("../../model/Board");
const testHelpers_1 = require("../testHelpers");
let board = Board_1.default.empty();
beforeEach(() => {
    board = Board_1.default.empty();
});
describe('a Rook', () => {
    test('has correct valid moves on an empty board when in corner', () => {
        const rook = new pieces_1.Rook('white', 7, 7);
        const moves = (0, testHelpers_1.sortPosArr)(rook.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, rook.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0]
        ]));
    });
    test('has correct valid moves on an empty board when in center', () => {
        const rook = new pieces_1.Rook('white', 2, 3);
        const moves = (0, testHelpers_1.sortPosArr)(rook.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, rook.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0]
        ]));
    });
    test('has correct valid moves when blocked by friendly pieces', () => {
        const rook = new pieces_1.Rook('white', 2, 3);
        board.add(new pieces_1.Rook('white', 2, 2));
        board.add(new pieces_1.Rook('white', 7, 3));
        const moves = (0, testHelpers_1.sortPosArr)(rook.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, rook.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1, 1, 1, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0]
        ]));
    });
    test('has correct valid moves when blocked by opponent pieces', () => {
        const rook = new pieces_1.Rook('black', 6, 6);
        board.add(new pieces_1.Rook('white', 6, 4));
        board.add(new pieces_1.Rook('white', 1, 6));
        board.add(new pieces_1.Rook('black', 7, 6));
        const moves = (0, testHelpers_1.sortPosArr)(rook.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, rook.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0]
        ]));
    });
});
