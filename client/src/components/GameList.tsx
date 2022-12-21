import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { getGames } from '../state/reducers/userReducer'
import GameListItem from './GameListItem'
import { Card, Divider, List, Typography } from '@mui/material'

export default function GameList() {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('Getting games')
    dispatch(getGames(user.accessToken))
  }, [user.username])

  if (user.isGuest) return null

  return (
    <Card sx={{ border: 1, borderColor: 'grey', width: 'clamp(50vw, 500px, 95vw)' }}>
      <Typography variant='h4' component='h1' margin={2}>
        Previous Games
      </Typography>
      <Divider />
      <List sx={{ width: '100%', bgcolor: 'background.paper', height: '40vh', overflowY: 'scroll' }}>
        {user.games.map(game => (
          <GameListItem key={game.id} game={game} />
        ))}
      </List>
    </Card>
  )
}
