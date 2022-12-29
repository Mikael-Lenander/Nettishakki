import React from 'react'
import Container from '@mui/material/Container'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import { AnimateKeyframes } from 'react-simple-animate'

type Props = {
  fetching: boolean
  children: JSX.Element | JSX.Element[]
  style?: React.CSSProperties
  size?: number
}

export default function LoadingSpinner({ fetching, children, size = 55, style }: Props) {
  return (
    <>
      {fetching ? (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...style }}>
          <AnimateKeyframes
            play
            duration={1}
            iterationCount='infinite'
            keyframes={['transform: rotate(0deg)', 'transform: rotate(360deg)']}
          >
            <DataUsageIcon sx={{ fontSize: size }} />
          </AnimateKeyframes>
        </Container>
      ) : (
        children
      )}
    </>
  )
}
