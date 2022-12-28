import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import { formatMilliseconds } from '../utils'

type Props = {
  time: number
  hasTurn?: boolean
}

export default function Clock({ time, hasTurn }: Props) {
  return (
    <Card sx={{ p: 1, border: `1px solid ${hasTurn ? 'black' : 'white'}` }}>
      <Typography style={{ fontSize: '24px' }}>{formatMilliseconds(time)}</Typography>
    </Card>
  )
}
