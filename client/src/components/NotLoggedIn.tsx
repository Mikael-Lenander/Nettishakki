import React, { CSSProperties } from 'react'
import { Container, Typography } from '@mui/material'
import { useAppSelector } from '../state/hooks'

interface Props {
  text: string
  children?: JSX.Element | JSX.Element[]
  style?: CSSProperties
  textVariant?: 'h6' | 'h5' | 'h4' | 'h3' | 'h2' | 'h1' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption'
}

export default function NotLoggedIn({ text, children, style = {}, textVariant = 'h6' }: Props) {
  const user = useAppSelector(state => state.user)

  return (
    <>
      {user.isGuest ? (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...style }}>
          <Typography color='black' variant={textVariant}>
            Login to see your {text}
          </Typography>
        </Container>
      ) : (
        children
      )}
    </>
  )
}
