import React from 'react'
import Paper from '@mui/material/Paper'
import TypoGraphy from '@mui/material/Typography'
import { Link } from 'react-router-dom'

type Props = {
  text: string,
  link: string,
  onClick?: (event: React.MouseEvent) => void
}

export default function MenuButton({ text, link, onClick }: Props) {

  return (
    <Paper elevation={5} className='hover-button' onClick={onClick} sx={{
      margin: '0.5em',
      width: 'clamp(200px, 30%, 300px)',
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '15px',
      // borderStyle: 'groove',
      background: 'linear-gradient(135deg, rgba(121,134,203,1) 0%, rgba(0,0,0,0.8718837876947654) 100%)'
    }}>
      <TypoGraphy variant='h3' align='center'>
        <Link to={link}
          style={{
            fontWeight: 550,
            fontFamily: 'Be Vietnam Pro',
            textDecoration: 'none',
            color: 'white'
          }}>
          {text}
        </Link>
      </TypoGraphy>
    </Paper>
  )
}
