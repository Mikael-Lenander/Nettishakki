import React, { useEffect, useState } from 'react'
import { useSocket } from '../hooks/socketContext'
import { Button, Container, ButtonGroup, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { offerDraw, drawOffered, resetDrawOffers } from '../state/reducers/gameReducer'

export default function InfoBarStatus() {
  const socket = useSocket()
  const game = useAppSelector(state => state.game)
  const [drawMessage, setDrawMessage] = useState('')
  const dispatch = useAppDispatch()

  function handleResign() {
    socket.emit('resign')
  }

  function handleOfferDraw() {
    socket.emit('offerDraw')
    setDrawMessage('Draw offer sent')
    dispatch(offerDraw())
  }

  function handleDrawOfferResponse(accepted: boolean) {
    return function inner() {
      socket.emit('drawOfferResponse', accepted)
      setDrawMessage('')
      if (!accepted) dispatch(resetDrawOffers())
    }
  }

  useEffect(() => {
    if (!socket || !game.active) return
    socket.on('drawOffered', () => {
      dispatch(drawOffered())
      setDrawMessage('')
    })
    socket.on('drawOfferResponded', (accepted: boolean) => {
      if (accepted) {
        setDrawMessage('')
      } else {
        dispatch(resetDrawOffers())
        setDrawMessage('Draw offer declined')
      }
    })
    return () => {
      socket.off('drawOffered')
      socket.off('drawOfferDeclined')
    }
  }, [socket])

  const textStyle = { display: 'flex', alignItems: 'center', fontSize: '20px' }

  return (
    <>
      <hr />
      <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {game.active && game.drawOffer.received && (
          <>
            <Typography style={textStyle}>Opponent offers draw</Typography>
            <ButtonGroup variant='contained' aria-label='outlined primary button group' sx={{ mt: 1 }}>
              <Button color='primary' onClick={handleDrawOfferResponse(true)}>
                Accept
              </Button>
              <Button color='primary' onClick={handleDrawOfferResponse(false)}>
                Decline
              </Button>
            </ButtonGroup>
          </>
        )}
        {game.active && !game.drawOffer.received && (
          <>
            <ButtonGroup variant='contained' aria-label='outlined primary button group'>
              <Button color='error' onClick={handleResign} disabled={!game.active || game.moves.length < 2}>
                Resign
              </Button>
              <Button color='warning' onClick={handleOfferDraw} disabled={!game.active || game.drawOffer.sent || game.moves.length < 2}>
                Offer draw
              </Button>
            </ButtonGroup>
            <Typography style={textStyle}>{drawMessage}</Typography>
          </>
        )}
      </Container>
    </>
  )
}
