import React from 'react'
import NavBar from './NavBar'
import Background from './Menu'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { SocketProvider } from '../hooks/socketContext'
import { indigo } from '@mui/material/colors'
import Board from './Board'

const customTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: indigo
  }
})

export default function App() {

  return (
    <SocketProvider>
      <ThemeProvider theme={customTheme}>
        <>
          <NavBar />
          <Background>
            <Board />
          </Background>
        </>
      </ThemeProvider>
    </SocketProvider>
  )
}