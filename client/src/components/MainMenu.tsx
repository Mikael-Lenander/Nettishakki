import React from 'react'
import MenuButton from './MenuButton'
import { useSocket } from '../hooks/socketContext'
import { useAppSelector } from '../state/hooks'
import { Navigate } from 'react-router-dom'

export default function MainMenu() {

  const socket = useSocket()
  const game = useAppSelector(state => state.game)

  function createGame() {
    socket && socket.emit('createGame')
  }

  if (game.active) return <Navigate to='/play' />

  return (
    <>
      <MenuButton text='Create new game' link='/lobby' onClick={createGame} />
      <MenuButton text='Join game' link='/join-game' />
    </>
  )
}
