import React from 'react'
import { Button, Typography, Toolbar, Box, AppBar } from '@mui/material'
import { Link } from 'react-router-dom'
// import Button from '@mui/material/Button';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1, background: '#8ca2ad' }}>
      <AppBar position='static'>
        <Toolbar style={{ height: '70px' }}>
          <Typography variant='h4' component='div' sx={{ flexGrow: 1, fontWeight: 600 }}>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              Chess
            </Link>
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
