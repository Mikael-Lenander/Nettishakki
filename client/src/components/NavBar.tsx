import React from 'react'
import { Button, Typography, Toolbar, Box, AppBar } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { logout, resetInfo } from '../state/reducers/userReducer'

export default function NavBar() {
  const user = useAppSelector(state => state.user)
  const game = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()

  const NavBarLink = ({ to, text }: { to: string; text: string }) => (
    <Link to={to} style={{ textDecoration: 'none', color: 'white' }} onClick={() => dispatch(resetInfo())}>
      {text}
    </Link>
  )

  return (
    <Box sx={{ flexGrow: 1, background: '#8ca2ad' }}>
      <AppBar position='static'>
        <Toolbar style={{ height: '70px' }}>
          <Typography variant='h4' component='div' sx={{ flexGrow: 1, fontWeight: 600 }}>
            <NavBarLink to='/' text='Chess' />
          </Typography>
          {!game.active && user.isGuest && (
            <>
              <Button data-testid='navbar-login-link'>
                <NavBarLink to='/login' text='Login' />
              </Button>
              <Button data-testid='navbar-signup-link'>
                <NavBarLink to='/signup' text='Sign Up' />
              </Button>
            </>
          )}
          {!game.active && !user.isGuest && (
            <Button
              color='inherit'
              component={Link}
              to='/'
              onClick={() => dispatch(logout(user.refreshToken))}
              data-testid='navbar-logout-link'
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
