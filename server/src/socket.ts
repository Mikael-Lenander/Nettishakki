import { Server } from 'socket.io'
import http from 'http'
import { ClientToServerEvents, ServerToClientEvents } from 'shared/types'
import { Game, Pos } from 'shared/chess'

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string; age: number;
}

const game: Game = new Game() //eslint-disable-line

export default function socketServer(server: http.Server) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  })

  io.on("connection", socket => {
    console.log('User connected');
    socket.on('makeMove', (oldPos: Pos, newPos: Pos) => {
      console.log('oldPos', oldPos)
      console.log('newPos', newPos)
      game.makeMove(new Pos(oldPos.x, oldPos.y), new Pos(newPos.x, newPos.y)) //eslint-disable-line
      io.emit('getMove', oldPos, newPos) //eslint-disable-line
    })
  })

}