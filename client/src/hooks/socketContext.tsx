import React, { createContext, useState, useContext, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from 'shared'
import { useAppSelector } from '../state/hooks'
import { URL } from '../constants'

const SocketContext = createContext<Socket | null>(null)

export function useSocket() {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
  const [socket, setSocket] = useState<Socket>()
  const username = useAppSelector(state => state.user.username)

  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, { query: { username } })
    setSocket(newSocket)
    return () => {
      newSocket.close()
    }
  }, [username])

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
