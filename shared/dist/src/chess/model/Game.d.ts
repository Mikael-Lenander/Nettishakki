import { Color, GameState, Move } from './types';
import Board from './Board';
import Pos from './Pos';
import { Piece } from './pieces';
import { GameOverMessage } from '../../types';
export default class Game {
    board: Board;
    turn: Color;
    mate: boolean;
    isCheck: boolean;
    constructor(board?: Board);
    switchTurns(): void;
    over(): GameOverMessage | null;
    static legalMoves(board: Board, isCheck: boolean, turn: Color, piece: Piece): Pos[];
    makeMove(oldPos: Pos, newPos: Pos): Move[];
    getMoves(piece: Piece): Pos[];
    static getMoves(game: GameState, pos: Pos): Pos[];
    allMoves(color: Color): Pos[];
    pieceIds(): string[];
}
