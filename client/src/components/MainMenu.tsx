import React from 'react'
import { useAppSelector } from '../state/hooks'
import { Navigate } from 'react-router-dom'
import GameList from './GameList'
import { Grid, Button, Container } from '@mui/material'
import Profile from './Profile'
import { Link } from 'react-router-dom'

export default function MainMenu() {
  const game = useAppSelector(state => state.game)

  const MenuButton = ({ to, text, dataTestId }: { to: string; text: string; dataTestId: string }) => {
    return (
      <Button
        variant='contained'
        color='success'
        size='large'
        sx={{ width: '98%', fontSize: '1.2rem' }}
        component={Link}
        to={to}
        data-testid={dataTestId}
      >
        {text}
      </Button>
    )
  }

  if (game.active) return <Navigate to='/play' />
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 'clamp(50vw, 700px, 95vw)',
        height: 'calc(0.85 * (100vh - 70px))'
      }}
    >
      <Grid container sx={{ marginBottom: 1 }} alignItems='flex-start' justifyContent='flex-start'>
        <Grid container item xs={4} spacing={1}>
          <Grid item xs={12}>
            <MenuButton text='Create new game' to='/new-game' dataTestId='create-game-button' />
          </Grid>
          <Grid item xs={12}>
            <MenuButton text='Join game' to='/join-game' dataTestId='join-game-button' />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Profile />
        </Grid>
      </Grid>
      <GameList />
    </Container>
  )
}
