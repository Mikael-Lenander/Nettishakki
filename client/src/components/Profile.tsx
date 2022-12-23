import React from 'react'
import { Container, Typography, Divider, Paper } from '@mui/material'
import { useAppSelector } from '../state/hooks'
import { formatName } from '../utils'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import NotLoggedIn from './NotLoggedIn'

export default function Profile() {
  const user = useAppSelector(state => state.user)

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
    >
      <NotLoggedIn text='game stats' textVariant='body1' style={{ color: 'black' }}>
        <Container style={{ flexBasis: '70%', backgroundColor: 'white' }}>
          <Typography variant='h5' component='h1' mt={1}>
            Total games: 87
          </Typography>
          <Divider />
          <Typography variant='body1' fontSize='large'>
            Victories: <span style={{ color: 'green' }}>29</span>
          </Typography>
          <Typography variant='body1' fontSize='large'>
            Draws: 29
          </Typography>
          <Typography variant='body1' fontSize='large'>
            Defeats: <span style={{ color: 'red' }}>29</span>
          </Typography>
        </Container>
      </NotLoggedIn>
      <Container sx={{ flexBasis: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <AccountCircleOutlinedIcon sx={{ fontSize: 80 }} />
        <Typography variant='caption' fontSize={18} fontWeight={400}>
          {formatName(user.username)}
        </Typography>
      </Container>
    </Paper>
  )
}
