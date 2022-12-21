import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Circle, CircleOutlined } from '@mui/icons-material'
import { GameOverMessage } from 'shared'

interface Props {
  whiteName: string
  blackName: string
  gameOverMessage: GameOverMessage | null
}

export default function InfoBar({ whiteName, blackName, gameOverMessage }: Props) {
  function formatGameOverMessage(data: GameOverMessage) {
    if (!data.winner) return `draw by ${data.message}`
    return `${data.winner} wins by ${data.message}`
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
        {whiteName.substring(0, 15)}
      </Typography>
      <Typography style={text}>
        <Circle />
        {blackName.substring(0, 15)}
      </Typography>
      <hr />
      {gameOverMessage && <Typography style={{ fontSize: '20px' }}>{formatGameOverMessage(gameOverMessage)}</Typography>}
    </Card>
  )
}
