import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Circle, CircleOutlined } from '@mui/icons-material'
import { GameOverCondition, GameOverMessage } from 'shared'

interface Props {
  whiteName: string
  blackName: string
  gameOverMessage: GameOverMessage | null
  children?: JSX.Element | JSX.Element[]
}

export default function InfoBar({ whiteName, blackName, gameOverMessage, children }: Props) {
  function formatGameOverMessage(data: GameOverMessage) {
    if (!data.winner) return data.message == GameOverCondition.Draw ? 'Agreed draw' : `Draw by ${data.message}`
    return `${data.winner} wins by ${data.message}`
  }

  const textStyle = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontSize: '21px'
  } as React.CSSProperties

  return (
    <Card variant='outlined' style={{ alignSelf: 'center', padding: '0.5em', minWidth: '170px' }}>
      <Typography style={textStyle}>
        <CircleOutlined />
        {whiteName.substring(0, 15)}
      </Typography>
      <Typography style={textStyle}>
        <Circle />
        {blackName.substring(0, 15)}
      </Typography>
      {children}
      {gameOverMessage && <Typography style={{ ...textStyle, fontSize: '20px' }}>{formatGameOverMessage(gameOverMessage)}</Typography>}
    </Card>
  )
}
