import React from 'react'
import Paper from '@mui/material/Paper'
import TypoGraphy from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

type Props = {
  text: string
}

export default function MenuButton({ text }: Props) {
  const theme = useTheme()
  console.log(theme.palette.primary);

  return (
    <Paper elevation={5} className='hover-button' onClick={() => console.log('clicked')} sx={{
      margin: '0.5em',
      width: 'clamp(200px, 30%, 300px)',
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '15px',
      // borderStyle: 'groove',
      background: theme.palette.primary.light
    }}>
      <TypoGraphy variant='h3' align='center' color='white' sx={{fontWeight: 550, fontFamily: 'Be Vietnam Pro'}}>
        {text}
      </TypoGraphy>
    </Paper>
  )
}
