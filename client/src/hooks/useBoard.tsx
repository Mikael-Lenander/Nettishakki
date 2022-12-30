import { useState, useRef } from 'react'
import { SimpleBoard, Pos, Game } from 'shared'
import { FinishedGame, Move } from 'shared'

export default function useBoard(finishedGame: FinishedGame) {
  const game = useRef(new Game())
  const [board, setBoard] = useState<SimpleBoard>(game.current.board.toSimple())
  const [nextMoveIndex, setNextMoveIndex] = useState(0)
  const [previousMoves, setPreviousMoves] = useState<Move[]>([])

  function nextMove() {
    if (nextMoveIndex >= finishedGame.moves.length) return
    const { oldPos, newPos } = finishedGame.moves[nextMoveIndex]
    const moves = game.current.makeMove(Pos.new(oldPos), Pos.new(newPos))
    setPreviousMoves(prev => (moves.length > 0 ? moves : prev))
    setBoard(game.current.board.toSimple())
    setNextMoveIndex(nextMoveIndex + 1)
  }

  function endState() {
    finishedGame.moves.slice(nextMoveIndex).forEach(({ oldPos, newPos }) => {
      game.current.makeMove(Pos.new(oldPos), Pos.new(newPos))
    })
    setNextMoveIndex(finishedGame.moves.length)
    setBoard(game.current.board.toSimple())
  }

  return { board, nextMove, endState, previousMoves, pieceIds: game.current.pieceIds() }
}
