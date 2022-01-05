import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1, background: '#8ca2ad' }}>
      <AppBar position="static">
        <Toolbar style={{height: '70px'}}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Chess
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
