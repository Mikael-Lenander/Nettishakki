"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pieces_1 = require("../../model/pieces");
const Board_1 = require("../../model/Board");
const testHelpers_1 = require("../testHelpers");
let board = Board_1.default.empty();
beforeEach(() => {
    board = Board_1.default.empty();
});
describe('a queen', () => {
    test('has correct valid moves on an empty board when in corner', () => {
        const queen = new pieces_1.Queen('white', 0, 0);
        const moves = (0, testHelpers_1.sortPosArr)(queen.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, queen.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0],
            [1, 0, 0, 1, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 0, 0, 1],
        ]));
    });
    test('has correct valid moves on an empty board when in center', () => {
        const queen = new pieces_1.Queen('white', 4, 5);
        const moves = (0, testHelpers_1.sortPosArr)(queen.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, queen.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 1, 0, 0, 0],
            [1, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 1, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 0, 1, 1, 1],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 1, 0],
        ]));
    });
    test('has correct valid moves when blocked by friendly pieces', () => {
        const queen = new pieces_1.Queen('white', 4, 5);
        board.add(new pieces_1.Queen('white', 0, 1));
        board.add(new pieces_1.Queen('white', 3, 6));
        board.add(new pieces_1.Queen('white', 4, 2));
        const moves = (0, testHelpers_1.sortPosArr)(queen.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, queen.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 0, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 0, 1, 0],
        ]));
    });
    test('has correct valid moves when blocked by opponent pieces', () => {
        const queen = new pieces_1.Queen('black', 4, 5);
        board.add(new pieces_1.Queen('white', 0, 1));
        board.add(new pieces_1.Queen('white', 3, 6));
        board.add(new pieces_1.Queen('white', 4, 2));
        const moves = (0, testHelpers_1.sortPosArr)(queen.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, queen.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 0, 1, 1, 1],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 0, 1, 0],
        ]));
    });
});
