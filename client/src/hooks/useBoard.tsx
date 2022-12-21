import { useState, useRef } from 'react'
import { SimpleBoard, Pos, Game, Board } from 'shared'
import { FinishedGame } from 'shared'

export default function useBoard(finishedGame: FinishedGame) {
  const [board, setBoard] = useState<SimpleBoard>(Board.simple())
  const [nextMoveIndex, setNextMoveIndex] = useState(0)
  const game = useRef(new Game())

  function nextMove() {
    if (nextMoveIndex >= finishedGame.moves.length) return
    const { oldPos, newPos } = finishedGame.moves[nextMoveIndex]
    game.current.makeMove(Pos.new(oldPos), Pos.new(newPos))
    setBoard(game.current.board.toSimple())
    setNextMoveIndex(nextMoveIndex + 1)
  }

  return { board, nextMove }
}
