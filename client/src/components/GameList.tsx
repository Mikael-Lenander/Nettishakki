import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { getGames } from '../state/reducers/userReducer'
import GameListItem from './GameListItem'
import { Card, Divider, List, Typography } from '@mui/material'
import NotLoggedIn from './NotLoggedIn'

export default function GameList() {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('Getting games')
    dispatch(getGames(user.accessToken))
  }, [user.username])

  return (
    <Card sx={{ border: 1, borderColor: 'grey', width: '100%', flexGrow: 1 }}>
      <Typography variant='h4' component='h1' margin={1} style={{ fontSize: '2rem' }}>
        Previous Games
      </Typography>
      <Divider />
      <NotLoggedIn text='previous games' style={{ height: 'calc(100% - 60px)' }}>
        <List sx={{ width: '100%', color: 'background.paper', height: 'calc(100% - 70px)', overflowY: 'scroll' }}>
          {user.games.map(game => (
            <GameListItem key={game.id} game={game} />
          ))}
        </List>
      </NotLoggedIn>
    </Card>
  )
}
