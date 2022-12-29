import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { getGames } from '../state/reducers/userReducer'
import GameListItem from './GameListItem'
import { Card, Divider, List, Typography, Container } from '@mui/material'
import NotLoggedIn from './NotLoggedIn'
import LoadingSpinner from './LoadingSpinner'

export default function GameList() {
  const user = useAppSelector(state => state.user)
  const { games, fetching } = useAppSelector(state => state.playerStats)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getGames(user.accessToken))
  }, [user.username])

  return (
    <Card sx={{ border: 1, borderColor: 'grey', width: '100%', flexGrow: 1 }}>
      <Typography variant='h4' component='h1' margin={1} style={{ fontSize: '2rem' }}>
        Previous Games
      </Typography>
      <Divider />
      <NotLoggedIn text='previous games' style={{ height: 'calc(100% - 60px)' }}>
        <LoadingSpinner fetching={fetching} size={70} style={{ height: 'calc(100% - 70px)' }}>
          {games.length === 0 && (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 60px)' }}>
              <Typography variant='h6'>No previous games yet</Typography>
            </Container>
          )}
          <List sx={{ width: '100%', color: 'background.paper', height: 'calc(100% - 70px)', overflowY: 'scroll' }}>
            {games.map(game => (
              <GameListItem key={game.id} game={game} />
            ))}
          </List>
        </LoadingSpinner>
      </NotLoggedIn>
    </Card>
  )
}
