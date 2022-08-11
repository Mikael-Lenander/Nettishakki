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
describe('Pins', () => {
    describe('when pinned by a rook', () => {
        beforeEach(() => {
            game.board.add([
                new pieces_1.King('black', 4, 0),
                new pieces_1.Rook('white', 4, 7),
                new pieces_1.Queen('black', 4, 1),
                new pieces_1.King('white', 0, 7)
            ]);
            game.turn = 'black';
        });
        test("a queen can't discover its own king", () => {
            const queen = game.board.pieceAt(new __1.Pos(4, 1));
            const moves = (0, testHelpers_1.sortPosArr)(game.getMoves(queen));
            (0, testHelpers_1.showMoves)(moves, queen.pos);
            expect(moves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0],
            ]));
        });
        test("a queen can move after the king has unpinned", () => {
            game.makeMove(new __1.Pos(4, 0), new __1.Pos(5, 0));
            game.turn = 'black';
            game.board.display();
            const queen = game.board.pieceAt(new __1.Pos(4, 1));
            const moves = (0, testHelpers_1.sortPosArr)(game.getMoves(queen));
            (0, testHelpers_1.showMoves)(moves, queen.pos);
            expect(moves).toEqual((0, testHelpers_1.extractMoves)([
                [0, 0, 0, 1, 1, 0, 0, 0],
                [1, 1, 1, 1, 0, 1, 1, 1],
                [0, 0, 0, 1, 1, 1, 0, 0],
                [0, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0],
            ]));
        });
    });
});
