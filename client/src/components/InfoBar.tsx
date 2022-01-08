import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Circle, CircleOutlined } from '@mui/icons-material'
import { useAppSelector } from '../state/hooks'
import { GameState } from 'shared/chess'

interface Props {
  game: GameState,
  gameOverMessage: string
}

export default function InfoBar({ game, gameOverMessage }: Props) {

  const { username } = useAppSelector(state => state.user)
  console.log('username', username)

  const players = {
    white: game.color === 'white' ? username : game.opponentName,
    black: game.color === 'black' ? username : game.opponentName
  }

  const text = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '25px'
  } as React.CSSProperties

  return (
    <Card variant='outlined' style={{alignSelf: 'center', padding: '0.5em'}}>
      <Typography style={text}>
        <CircleOutlined />
        {players.white.substring(0, 15)}
      </Typography>
      <Typography style={text}>
        <Circle />
        {players.black.substring(0, 15)}
      </Typography>
      <hr />
      {gameOverMessage && <Typography style={text}>{gameOverMessage}</Typography>}
    </Card>
  )
}
