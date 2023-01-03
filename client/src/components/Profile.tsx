import React from 'react'
import { Container, Typography, Divider, Paper } from '@mui/material'
import { useAppSelector } from '../state/hooks'
import { formatName } from '../utils'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import NotLoggedIn from './NotLoggedIn'
import LoadingSpinner from './LoadingSpinner'

export default function Profile() {
  const user = useAppSelector(state => state.user)
  const { gameCounts, fetching } = useAppSelector(state => state.playerStats)

  return (
    <Paper
      sx={{
        height: '100%',
        border: '1px black solid',
        borderRadius: '5px',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center'
      }}
      data-testid='profile-section'
    >
      <Container style={{ flexBasis: '70%', backgroundColor: 'white' }}>
        <NotLoggedIn text='game stats' textVariant='body1' style={{ color: 'black' }}>
          <LoadingSpinner fetching={fetching} size={40}>
            <Typography variant='h5' component='h1' mt={1}>
              Total games: {gameCounts.victories + gameCounts.draws + gameCounts.defeats}
            </Typography>
            <Divider />
            <Typography variant='body1' fontSize='large' style={{ color: 'black' }}>
              Victories: <span style={{ color: 'green' }}>{gameCounts.victories}</span>
            </Typography>
            <Typography variant='body1' fontSize='large' style={{ color: 'black' }}>
              Draws: {gameCounts.draws}
            </Typography>
            <Typography variant='body1' fontSize='large' style={{ color: 'black' }}>
              Defeats: <span style={{ color: 'red' }}>{gameCounts.defeats}</span>
            </Typography>
          </LoadingSpinner>
        </NotLoggedIn>
      </Container>
      <Container sx={{ flexBasis: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <AccountCircleOutlinedIcon sx={{ fontSize: 80 }} />
        <Typography variant='caption' fontSize={18} fontWeight={400}>
          {formatName(user.username)}
        </Typography>
      </Container>
    </Paper>
  )
}
