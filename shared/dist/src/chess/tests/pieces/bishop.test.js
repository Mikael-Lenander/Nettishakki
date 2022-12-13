"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pieces_1 = require("../../model/pieces");
const Board_1 = require("../../model/Board");
const testHelpers_1 = require("../testHelpers");
let board = Board_1.default.empty();
beforeEach(() => {
    board = Board_1.default.empty();
});
describe('a bishop', () => {
    test('has correct valid moves on an empty board when in corner', () => {
        const bishop = new pieces_1.Bishop('white', 0, 0);
        const moves = (0, testHelpers_1.sortPosArr)(bishop.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, bishop.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 1]
        ]));
    });
    test('has correct valid moves on an empty board when in center', () => {
        const bishop = new pieces_1.Bishop('white', 4, 5);
        const moves = (0, testHelpers_1.sortPosArr)(bishop.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, bishop.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 0]
        ]));
    });
    test('has correct valid moves when blocked by friendly pieces', () => {
        const bishop = new pieces_1.Bishop('white', 4, 5);
        board.add(new pieces_1.Bishop('white', 0, 1));
        board.add(new pieces_1.Bishop('white', 3, 6));
        const moves = (0, testHelpers_1.sortPosArr)(bishop.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, bishop.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0]
        ]));
    });
    test('has correct valid moves when blocked by opponent pieces', () => {
        const bishop = new pieces_1.Bishop('black', 4, 5);
        board.add(new pieces_1.Bishop('white', 0, 1));
        board.add(new pieces_1.Bishop('white', 3, 6));
        const moves = (0, testHelpers_1.sortPosArr)(bishop.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, bishop.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0]
        ]));
    });
});
