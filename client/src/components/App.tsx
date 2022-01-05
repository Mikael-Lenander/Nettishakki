/* import React, { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from 'shared/types' */
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

/*   const [socket, setSocket] = useState<Socket>()

  console.log(socket)

  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3001')
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, []) */

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