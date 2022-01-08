import React from 'react'
import { useSocket } from '../hooks/socketContext'
import { useAppSelector } from '../state/hooks'
import { Navigate } from 'react-router-dom'
import MenuButton from './MenuButton'

export default function MainMenu() {

  const socket = useSocket()
  const game = useAppSelector(state => state.game)

  function createGame() {
    socket && socket.emit('createGame')
  }

  const flex = { width: '100%', display: 'flex' }

  if (game.active) return <Navigate to='/play' />
  return (
    <div style={{ ...flex, alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ ...flex, justifyContent: 'center' }}>
        <MenuButton text='Create new game' link='/lobby' onClick={createGame} />
        <MenuButton text='Join game' link='/join-game' />
      </div>
    </div>
  )
}
