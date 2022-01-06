import { Server } from 'socket.io'
import http from 'http'
import { ClientToServerEvents, ServerToClientEvents } from 'shared/types'
import { Game, Pos, PosType } from 'shared/chess'

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
    socket.on('makeMove', (oldPos: PosType, newPos: PosType) => {
      const moves = game.makeMove(Pos.new(oldPos), Pos.new(newPos))//eslint-disable-line
      io.emit('getMove', moves, game.check, game.turn) //eslint-disable-line
    })
  })

}