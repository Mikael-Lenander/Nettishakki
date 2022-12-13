"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pieces_1 = require("../../model/pieces");
const Board_1 = require("../../model/Board");
const testHelpers_1 = require("../testHelpers");
const Game_1 = require("../../model/Game");
const __1 = require("../..");
let board = Board_1.default.empty();
beforeEach(() => {
    board = Board_1.default.empty();
});
describe('a King', () => {
    test('has correct valid moves on an empty board when in corner', () => {
        const king = new pieces_1.King('white', 7, 0);
        const moves = (0, testHelpers_1.sortPosArr)(king.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, king.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
    });
    test('has correct valid moves on an empty board when in center', () => {
        const king = new pieces_1.King('white', 4, 5);
        const moves = (0, testHelpers_1.sortPosArr)(king.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, king.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
    });
    test('has correct valid moves when blocked by friendly pieces', () => {
        const king = new pieces_1.King('white', 1, 7);
        board.add(new pieces_1.Pawn('white', 0, 7));
        board.add(new pieces_1.Pawn('white', 2, 6));
        const moves = (0, testHelpers_1.sortPosArr)(king.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, king.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0]
        ]));
    });
    test('has correct valid moves when blocked by opponent pieces', () => {
        const king = new pieces_1.King('black', 6, 5);
        board.add([new pieces_1.Pawn('white', 5, 6), new pieces_1.Pawn('white', 7, 6), new pieces_1.Pawn('black', 6, 4)]);
        const moves = (0, testHelpers_1.sortPosArr)(king.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, king.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
    });
    test('can castle with black', () => {
        const king = new pieces_1.King('black', 4, 7);
        board.add([new pieces_1.Rook('black', 0, 7), new pieces_1.Rook('black', 7, 7)]);
        const moves = (0, testHelpers_1.sortPosArr)(king.validMoves(board));
        (0, testHelpers_1.showMoves)(moves, king.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 1, 1, 0]
        ]));
    });
    test('can castle with white', () => {
        const king = new pieces_1.King('white', 4, 0);
        board.add([new pieces_1.Rook('white', 0, 0), new pieces_1.Rook('white', 7, 0)]);
        const moves = (0, testHelpers_1.sortPosArr)(king.legalMoves(board));
        (0, testHelpers_1.showMoves)(moves, king.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 1, 1, 0, 1, 1, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
    });
    test("can't castle when blocked by friendly pieces", () => {
        const king = new pieces_1.King('white', 4, 0);
        board.add([new pieces_1.Rook('white', 0, 0), new pieces_1.Rook('white', 7, 0), new pieces_1.Bishop('white', 3, 0), new pieces_1.Bishop('white', 5, 0)]);
        const moves = (0, testHelpers_1.sortPosArr)(king.legalMoves(board));
        (0, testHelpers_1.showMoves)(moves, king.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
    });
    test("can't castle when blocked by opponent pieces", () => {
        const king = new pieces_1.King('black', 4, 7);
        board.add([new pieces_1.Rook('black', 0, 7), new pieces_1.Rook('black', 7, 7), new pieces_1.Bishop('white', 7, 3), new pieces_1.Rook('white', 5, 0)]);
        const moves = (0, testHelpers_1.sortPosArr)(king.legalMoves(board));
        (0, testHelpers_1.showMoves)(moves, king.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
    });
    test("can't castle after king or rook has moved", () => {
        const king = new pieces_1.King('white', 4, 0);
        board.add([king, new pieces_1.Rook('white', 0, 0), new pieces_1.Rook('white', 7, 0), new pieces_1.Pawn('black', 0, 6), new pieces_1.King('black', 6, 7)]);
        const game = new Game_1.default(board);
        game.makeMove(king.pos, new __1.Pos(5, 0));
        game.makeMove(new __1.Pos(0, 6), new __1.Pos(0, 5));
        game.makeMove(new __1.Pos(5, 0), new __1.Pos(4, 0));
        const moves = (0, testHelpers_1.sortPosArr)(king.legalMoves(board));
        (0, testHelpers_1.showMoves)(moves, king.pos);
        expect(moves).toEqual((0, testHelpers_1.extractMoves)([
            [0, 0, 0, 1, 0, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ]));
    });
    test('castles short correctly', () => {
        const king = new pieces_1.King('white', 4, 0);
        board.add([new pieces_1.Rook('white', 0, 0), new pieces_1.Rook('white', 7, 0), new pieces_1.King('black', 2, 7), king]);
        const game = new Game_1.default(board);
        game.makeMove(king.pos, new __1.Pos(6, 0));
        game.board.display();
        expect(game.board.pieceAt(new __1.Pos(4, 0))).toBeNull();
        expect(game.board.pieceAt(new __1.Pos(5, 0))).toEqual(new pieces_1.Rook('white', 5, 0));
        expect(game.board.pieceAt(new __1.Pos(6, 0))).toEqual(new pieces_1.King('white', 6, 0));
        expect(game.board.pieceAt(new __1.Pos(7, 0))).toBeNull();
    });
    test('castles long correctly', () => {
        //  [0, 0, 0, 0, 0, 0, 0, 0],
        //  [0, 0, 0, 0, 0, 0, 0, 0],
        //  [0, 0, 0, 0, 0, 0, 0, 0],
        //  [0, 0, 0, 0, 0, 0, 0, 0],
        //  [0, 0, 0, 0, 0, 0, 0, 0],
        //  [0, 0, 0, 0, 0, 0, 0, 0],
        //  [0, 0, 0, 0, 0, 0, 0, 0],
        //  [r, 0, 0, 0, k, 0, 0, 0],
        const king = new pieces_1.King('black', 4, 7);
        board.add([new pieces_1.Rook('black', 0, 7), new pieces_1.Rook('black', 7, 7), new pieces_1.King('white', 2, 0), king]);
        const game = new Game_1.default(board);
        game.turn = 'black';
        game.makeMove(king.pos, new __1.Pos(2, 7));
        game.board.display();
        expect(game.board.pieceAt(new __1.Pos(0, 7))).toBeNull();
        expect(game.board.pieceAt(new __1.Pos(1, 7))).toBeNull();
        expect(game.board.pieceAt(new __1.Pos(2, 7))).toEqual(new pieces_1.King('black', 2, 7));
        expect(game.board.pieceAt(new __1.Pos(3, 7))).toEqual(new pieces_1.Rook('black', 3, 7));
        expect(game.board.pieceAt(new __1.Pos(4, 7))).toBeNull();
    });
});
