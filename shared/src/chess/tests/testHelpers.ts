import { MockBoard, Tuple2 } from '../model/types'
import Pos from '../model/Pos'

export const mockBoard = (): MockBoard => {
  return [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ]
}

// Jäjestää Pos-olioita sisältävän listan, jotta testeissä voi verrata listoja
export function sortPosArr(posArray: Pos[]) {
  return posArray.sort((a, b) => {
    if (a.x === b.x) return a.y - b.y
    return a.x - b.x
  })
}

// Näyttää graafisesti nappulan siirrot shakkilaudalla
export function showMoves(moves: Pos[], piecePos?: Pos): MockBoard {
  const board = mockBoard()
  moves.forEach((move) => {
    board[move.y][move.x] = 'x'
  })
  if (piecePos) board[piecePos.y][piecePos.x] = 'P'
  console.table(board)
  return board
}

// Palauttaa ne laudan sijainnit, joissa on nappula (valelaudalla numero 1). Helpottaa testaamista, kun testien oikeat vastaukset
// voi merkata graafiselle laudalle.
export function extractMoves(board: MockBoard): Pos[] {
  return sortPosArr(board.flatMap((row, rowIndex) => row.flatMap((col, colIndex) => (col ? new Pos(colIndex, rowIndex) : null))).filter((item) => item))
}

export function extractPos(positions: Tuple2[]) {
  return sortPosArr(positions.map((tuple) => new Pos(tuple[0], tuple[1])))
}
