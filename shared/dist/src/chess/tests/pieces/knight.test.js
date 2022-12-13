"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pieces_1 = require("../../model/pieces");
const Board_1 = require("../../model/Board");
const testHelpers_1 = require("../testHelpers");
let board = Board_1.default.empty();
beforeEach(() => {
    board = Board_1.default.empty();
});
describe('A knight', () => {
    test('has correct valid moves on an empty board when in corner', () => {
        const knight = new pieces_1.Knight('white', 0, 7);
        const moves = (0, testHelpers_1.sortPosArr)(knight.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, knight.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
    });
    test('has correct valid moves on an empty board when in center', () => {
        const knight = new pieces_1.Knight('white', 3, 4);
        const moves = (0, testHelpers_1.sortPosArr)(knight.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, knight.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
    });
    test('has correct valid moves when blocked by friendly pieces', () => {
        const knight = new pieces_1.Knight('white', 2, 1);
        board.add(new pieces_1.Knight('white', 4, 2));
        board.add(new pieces_1.Knight('white', 0, 0));
        const moves = (0, testHelpers_1.sortPosArr)(knight.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, knight.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
    });
    test('has correct valid moves when blocked by opponent pieces', () => {
        const knight = new pieces_1.Knight('white', 1, 6);
        board.add(new pieces_1.Knight('black', 2, 4));
        board.add(new pieces_1.Knight('black', 3, 7));
        const moves = (0, testHelpers_1.sortPosArr)(knight.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, knight.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0]
        ]));
    });
});
