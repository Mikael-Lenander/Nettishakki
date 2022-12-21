import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { getGames } from '../state/reducers/userReducer'
import { ListItem, ListItemText, List, Divider, Avatar, Card, Typography } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { Link } from 'react-router-dom'

export default function GameList() {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('Getting games')
    dispatch(getGames(user.accessToken))
  }, [user.username])

  if (user.isGuest) return null

  return (
    <Card>
      <Typography variant='h4' component='h1' margin={1} gutterBottom>
        Previous Games
      </Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper', height: 300, verticalOverFlow: 'scroll' }}>
        {user.games.map(game => (
          <div key={game.id}>
            <Link to={`/game/${game.id}`} style={{ textDecoration: 'none' }} key={game.id}>
              <ListItem>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText
                  primary={`${game.whiteName} vs ${game.blackName}`}
                  secondary={`${game.winner} wins by ${game.overMessage}\n${game.date}`}
                />
              </ListItem>
            </Link>
            <Divider variant='inset' component='li' />
          </div>
        ))}
      </List>
    </Card>
  )
}
