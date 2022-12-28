import React, { useEffect, useState } from 'react'
import { useSocket } from '../hooks/socketContext'
import { Color, Info, TimeControl } from 'shared'
import { initializeGame, startGame } from '../state/reducers/gameReducer'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'
import FormContainer from './FormContainer'
import SelectInput from './SelectInput'
import * as Yup from 'yup'

export default function NewGame() {
  const game = useAppSelector(state => state.game)
  const socket = useSocket()
  const dispatch = useAppDispatch()
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (!socket) return
    socket.on('gameCreated', (info: Info, color: Color, gameId: string, timeControl: TimeControl) => {
      if (info.success) {
        dispatch(initializeGame({ color, gameId, timeControl }))
      }
      setErrorMessage(info.message)
    })
    socket.on('joinedGame', (info: Info, opponentName) => {
      if (info.success) {
        dispatch(startGame({ opponentName }))
      }
    })
    return () => {
      socket.off('joinedGame')
      socket.off('gameCreated')
    }
  }, [socket])

  if (game.active) return <Navigate to='/play' />
  return (
    <>
      {game.waitingForOpponent ? (
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', color: 'black' }}>
          <Typography variant='h3' component='h1'>
            Your game id: {game.id}
          </Typography>
          <Typography variant='h4' component='h2'>
            Waiting for opponent...
          </Typography>
        </Container>
      ) : errorMessage ? (
        <Alert severity='error'>{errorMessage}</Alert>
      ) : (
        <FormContainer
          title='New game'
          initialValues={{
            time: '5',
            increment: '3'
          }}
          validationSchema={Yup.object({
            time: Yup.number().required('Required field'),
            increment: Yup.number().required('Required field')
          })}
          onSubmit={({ time, increment }) => socket.emit('createGame', { time: parseInt(time) * 60, increment: parseInt(increment) })}
          submitText='Create'
        >
          <SelectInput label='Minutes per side' name='time' defaultValue={5} values={[1, 3, 5, 10]} />
          <SelectInput label='Increment in seconds' name='increment' defaultValue={3} values={[0, 1, 2, 3]} />
        </FormContainer>
      )}
    </>
  )
}
