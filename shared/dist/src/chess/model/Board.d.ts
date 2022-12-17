import { BoardType, PieceType, Move, Color, SimpleBoard } from './types';
import { King, Piece } from './pieces';
import Pos from './Pos';
export default class Board {
    static size: number;
    board: BoardType;
    moves: Move[];
    constructor(board?: BoardType);
    pieceAt(pos: Pos): PieceType;
    isEmptySquare(pos: Pos): boolean;
    setPiece(piece: Piece, oldPos: Pos, newPos: Pos, saveMove?: boolean): Move;
    castle(king: King, oldPos: Pos, newPos: Pos): Move[];
    enPassant(piece: Piece, oldPos: Pos, newPos: Pos): Move[];
    movePiece(oldPos: Pos, newPos: Pos): Move[];
    kingPosition(color: Color): Pos;
    pieces(color: Color): Piece[];
    longRangePieces(color: Color): Piece[];
    kingAttackingPieces(color: Color): Piece[];
    pinningPiece(pinnedPiece: Piece): Piece | null;
    inCheck(color: Color): boolean;
    controlledSquares(color: Color): Pos[];
    insufficientMaterial(): boolean;
    toSimple(): {
        name: import("./types").PieceName;
        color: Color;
    }[][];
    static simple(): SimpleBoard;
    static toFullImplementation(board: SimpleBoard, moves: Move[]): Board;
    add(pieces: Piece | Piece[]): void;
    display(): void;
    static empty(): Board;
    static createBoard(): BoardType;
}
