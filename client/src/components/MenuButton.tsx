import React from 'react'
import TypoGraphy from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

type Props = {
  text: string
  link?: string
  onClick?: () => void
}

export default function MenuButton({ text, link, onClick }: Props) {
  const navigate = useNavigate()

  function handleClick() {
    onClick && onClick()
    link && navigate(link)
  }

  return (
    <Button
      className="hover-button"
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '15px',
        background: 'linear-gradient(135deg, rgba(121,134,203,1) 0%, rgba(0,0,0,0.8718837876947654) 100%)',
        height: '300px',
        width: 'clamp(200px, 30%, 300px)',
        color: 'white',
        margin: '0.5em',
        '&:hover': {
          backgroundColor: '#3f51b5'
        }
      }}
    >
      <TypoGraphy variant="h3">{text}</TypoGraphy>
    </Button>
  )
}
