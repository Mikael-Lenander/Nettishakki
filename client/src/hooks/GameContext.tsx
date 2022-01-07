import React, { useState, useEffect, useContext, useRef } from 'react'
import { useSocket } from './socketContext'
import { Game, Pos } from '../chess'
import { cloneDeep } from 'lodash'

export type PosType = {
  x: number,
  y: number
}

type GameContextValue = {
  game: Game,
  makeMove: (oldPos: Pos, newPos: Pos) => void
}

const GameContext = React.createContext<GameContextValue>({
  game: null,
  makeMove: null
})

export function useGame() {
  return useContext(GameContext)
}

export function GameProvider({ children }: { children: JSX.Element }) {
  const gameRef = useRef(new Game())
  const [game, setGame] = useState<Game>(gameRef.current)
  const socket = useSocket()

  function makeMove(oldPos: Pos, newPos: Pos) {
    socket.emit('makeMove', oldPos, newPos)
  }

  useEffect(() => {
    if (!socket) return
    socket.on('getMove', (oldPos: PosType, newPos: PosType) => {
      gameRef.current.makeMove(new Pos(oldPos.x, oldPos.y), new Pos(newPos.x, newPos.y))
      const newGame = cloneDeep(gameRef.current)
      setGame(newGame)
    })

    return () => {
      socket.off('getMove')
    }
  }, [socket])
  return (
    <GameContext.Provider value={{game, makeMove}}>
      {children}
    </GameContext.Provider>
  )
}