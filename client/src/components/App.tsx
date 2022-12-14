import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SocketProvider } from '../hooks/socketContext'
import { indigo } from '@mui/material/colors'
import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import Background from './Background'
import MainMenu from './MainMenu'
import JoinGameMenu from './JoinGameMenu'
import Lobby from './Lobby'
import Login from './Login'
import SignUp from './SignUp'
import Game from './Game'
import { PublicRoute } from './Routes'

const customTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
      fontFamily: 'Lato',
      fontSize: 18
    },
    fontFamily: 'Lato'
  },
  palette: {
    primary: indigo
  }
})

export default function App() {
  return (
    <SocketProvider>
      <ThemeProvider theme={customTheme}>
        <NavBar />
        <Routes>
          <Route element={<Background />}>
            <Route path='/' element={<MainMenu />} />
            <Route path='/lobby' element={<Lobby />} />
            <Route path='/play' element={<Game />} />
            <Route path='/join-game' element={<JoinGameMenu />} />
            <Route element={<PublicRoute redirectPath='/' />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
            </Route>
            <Route path='*' element={<h1 style={{ color: 'white' }}>404 NOT FOUND</h1>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </SocketProvider>
  )
}
