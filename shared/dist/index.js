"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_1 = require("./src/chess");
const testHelpers_1 = require("./src/chess/tests/testHelpers");
const board = chess_1.Board.empty();
const king = new chess_1.King('white', 4, 0);
board.add([
    king,
    new chess_1.Rook('white', 0, 0),
    new chess_1.Rook('white', 7, 0),
    new chess_1.Pawn('black', 0, 6),
    new chess_1.King('black', 6, 7)
]);
const game = new chess_1.Game(board);
game.makeMove(king.pos, new chess_1.Pos(5, 0));
game.makeMove(new chess_1.Pos(0, 6), new chess_1.Pos(0, 5));
game.makeMove(new chess_1.Pos(5, 0), new chess_1.Pos(4, 0));
game.board.display();
const moves = king.legalMoves(board);
(0, testHelpers_1.showMoves)(moves, king.pos);
