import React, { createContext, useState, useContext, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from 'shared/types'

const SocketContext = createContext<Socket | null>(null);

export function useSocket() {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3001')
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
