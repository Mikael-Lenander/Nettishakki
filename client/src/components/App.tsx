import React from 'react'
import NavBar from './NavBar'
import Background from './Menu'
import { ThemeProvider, createTheme } from '@mui/material/styles'
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
        <ThemeProvider theme={customTheme}>
          <>
            <NavBar />
            <Background>
              {/*           <MenuButton text='Create new game' />
          <MenuButton text='Join game' /> */}
              <Board />
            </Background>
          </>
        </ThemeProvider>
  )
}