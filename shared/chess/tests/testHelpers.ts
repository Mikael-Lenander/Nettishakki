import Board from '../model/Board'
import { MockBoard } from '../types'
import Pos from '../model/Pos'

export const mockBoard = (): MockBoard => Array(8).fill(
  Array(Board.size).fill(null)
) as MockBoard

// Jäjestää Pos-olioita sisältävän listan, jotta testeissä voi verrata listoja
export function sortPosArr(posArray: Pos[]) {
  return posArray.sort((a, b) => {
    if (a.x === b.x) return a.y - b.y
    return a.x - b.x
  })
}

// Näyttää graafisesti nappulan siirrot shakkilaudalla
export function showMoves(piecePos: Pos, moves: Pos[]): void {
  const board = mockBoard()
  moves.forEach(move => {
    board[move.y][move.x] = 'x'
  })
  board[piecePos.y][piecePos.x] = 'P'
  console.table(board)
}

// Palauttaa ne laudan sijainnit, joissa on nappula
export function extractMoves(board: MockBoard): Pos[] {
  return sortPosArr(board.flatMap((row, rowIndex) =>
    row.flatMap((col, colIndex) =>
      col ? { x: colIndex, y: rowIndex } : null
    )
  ).filter(item => item) as Pos[])
}