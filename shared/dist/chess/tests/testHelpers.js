"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPos = exports.extractMoves = exports.showMoves = exports.sortPosArr = exports.mockBoard = void 0;
const Pos_1 = require("../model/Pos");
const mockBoard = () => {
    return [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
    ];
};
exports.mockBoard = mockBoard;
// Jäjestää Pos-olioita sisältävän listan, jotta testeissä voi verrata listoja
function sortPosArr(posArray) {
    return posArray.sort((a, b) => {
        if (a.x === b.x)
            return a.y - b.y;
        return a.x - b.x;
    });
}
exports.sortPosArr = sortPosArr;
// Näyttää graafisesti nappulan siirrot shakkilaudalla
function showMoves(moves, piecePos) {
    const board = (0, exports.mockBoard)();
    moves.forEach(move => {
        board[move.y][move.x] = 'x';
    });
    if (piecePos)
        board[piecePos.y][piecePos.x] = 'P';
    console.table(board);
    return board;
}
exports.showMoves = showMoves;
// Palauttaa ne laudan sijainnit, joissa on nappula (valelaudalla numero 1). Helpottaa testaamista, kun testien oikeat vastaukset
// voi merkata graafiselle laudalle.
function extractMoves(board) {
    return sortPosArr(board.flatMap((row, rowIndex) => row.flatMap((col, colIndex) => col ? new Pos_1.default(colIndex, rowIndex) : null)).filter(item => item));
}
exports.extractMoves = extractMoves;
function extractPos(positions) {
    return sortPosArr(positions.map(tuple => new Pos_1.default(tuple[0], tuple[1])));
}
exports.extractPos = extractPos;
