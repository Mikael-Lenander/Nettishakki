import { Server } from 'socket.io'
import http from 'http'
import { ClientToServerEvents, ServerToClientEvents } from 'shared/types'

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string; age: number;
}

export default function socketServer(server: http.Server) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  })

  io.on("connection", () => {
    console.log('User connected');

  })

}