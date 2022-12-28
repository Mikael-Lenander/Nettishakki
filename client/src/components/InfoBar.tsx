import React from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Circle, CircleOutlined } from '@mui/icons-material'
import { GameOverCondition, GameOverMessage } from 'shared'
import Clock from './Clock'

interface Props {
  whiteName: string
  blackName: string
  gameOverMessage: GameOverMessage | null
  children?: JSX.Element | JSX.Element[]
  upperTime?: number
  lowerTime?: number
  hasTurn?: boolean
}

export default function InfoBar({ whiteName, blackName, gameOverMessage, children, upperTime, lowerTime, hasTurn }: Props) {
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
    <Container style={{ alignSelf: 'center', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5 }}>
      {upperTime != null && <Clock time={upperTime} hasTurn={hasTurn === false} />}
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
      {lowerTime != null && <Clock time={lowerTime} hasTurn={hasTurn} />}
    </Container>
  )
}
