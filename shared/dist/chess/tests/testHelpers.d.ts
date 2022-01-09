import { MockBoard, Tuple2 } from '../model/types';
import Pos from '../model/Pos';
export declare const mockBoard: () => MockBoard;
export declare function sortPosArr(posArray: Pos[]): Pos[];
export declare function showMoves(moves: Pos[], piecePos?: Pos): MockBoard;
export declare function extractMoves(board: MockBoard): Pos[];
export declare function extractPos(positions: Tuple2[]): Pos[];
