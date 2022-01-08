import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Circle, CircleOutlined } from '@mui/icons-material'
import { useAppSelector } from '../state/hooks'
import { GameState } from '../chess'
import { GameOverMessage } from 'shared/types'

interface Props {
  game: GameState,
}

export default function InfoBar({ game }: Props) {

  function formatGameOverMessage(data: GameOverMessage) {
    if (!data.winner) return `draw by ${data.message}`
    return `${data.winner} wins by ${data.message}`
  }

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
    fontSize: '22px'
  } as React.CSSProperties

  return (
    <Card variant='outlined' style={{ alignSelf: 'center', padding: '0.5em' }}>
      <Typography style={text}>
        <CircleOutlined />
        {players.white.substring(0, 15)}
      </Typography>
      <Typography style={text}>
        <Circle />
        {players.black.substring(0, 15)}
      </Typography>
      <hr />
      {game.overMessage && <Typography style={{ fontSize: '20px' }}>{formatGameOverMessage(game.overMessage)}</Typography>}
    </Card>
  )
}
