import React, { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from 'shared/types'

export default function App() {

  const [socket, setSocket] = useState<Socket>()

  console.log(socket)

  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3001')
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, [])

  return (
    <div>
      moi
    </div>
  )
}