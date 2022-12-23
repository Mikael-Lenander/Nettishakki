import React, { useMemo } from 'react'
import { FinishedGame } from 'shared'
import { ListItem, ListItemText, Divider, ListItemAvatar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import BoardComponent from './Board'
import useBoard from '../hooks/useBoard'
import { useAppSelector } from '../state/hooks'
import { formatName, formatDate, formatGameOverMessage } from '../utils'

export default function GameListItem({ game }: { game: FinishedGame }) {
  const user = useAppSelector(state => state.user)
  const { board, endState } = useBoard(game)
  useMemo(() => {
    endState()
  }, [])

  return (
    <Link to={`/game/${game.id}`} style={{ textDecoration: 'none', color: 'black', margin: 0, padding: 0 }} key={game.id}>
      <ListItem>
        <ListItemAvatar>
          <BoardComponent size={100} board={board} playerColor={game.whiteName === user.username ? 'white' : 'black'} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant='h5' component='h2'>
              {formatName(game.whiteName)} vs {formatName(game.blackName)}
            </Typography>
          }
          secondary={
            <Typography variant='body1' component='p'>
              {formatGameOverMessage(game.overMessage, game.winner, game.whiteName, game.blackName)} | {formatDate(game.date)}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </Link>
  )
}
