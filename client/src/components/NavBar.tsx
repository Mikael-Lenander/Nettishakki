import React from 'react'
import { Button, Typography, Toolbar, Box, AppBar } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { logout } from '../state/reducers/userReducer'
// import Button from '@mui/material/Button';

export default function NavBar() {
  const user = useAppSelector(state => state.user)
  const game = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()

  return (
    <Box sx={{ flexGrow: 1, background: '#8ca2ad' }}>
      <AppBar position='static'>
        <Toolbar style={{ height: '70px' }}>
          <Typography variant='h4' component='div' sx={{ flexGrow: 1, fontWeight: 600 }}>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              Chess
            </Link>
          </Typography>
          {!game.active && user.isGuest && (
            <>
              <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
                <Button color='inherit'>Login</Button>
              </Link>
              <Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>
                <Button color='inherit'>Sign up</Button>
              </Link>
            </>
          )}
          {!game.active && !user.isGuest && (
            <Button color='inherit' onClick={() => dispatch(logout(user.refreshToken))}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
