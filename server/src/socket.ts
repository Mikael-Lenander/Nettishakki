import { Server } from 'socket.io'
import http from 'http'
import { ClientToServerEvents, ServerToClientEvents } from 'shared/types'
import { InterServerEvents, SocketData, ActiveGames, GameStatus } from './types'
import { Game, opponent, Pos, PosType } from 'shared/chess'
import { generateUniqueId, randomColor } from './utils'

const activeGames: ActiveGames = {}

export default function socketServer(server: http.Server) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  })

  io.on("connection", socket => {
    const username = socket.handshake.query.username as string
    socket.join(username)
    let currentGameId = ''
    console.log(`User ${username} connected`)

    socket.on('createGame', () => {
      if (!username) return console.log('no user')
      const userColor = randomColor()
      const gameId = generateUniqueId(Object.keys(activeGames))
      activeGames[gameId] = {
        game: new Game(),
        status: GameStatus.Starting,
        players: {
          white: userColor === 'white' ? username : null,
          black: userColor === 'black' ? username : null
        }
      }
      socket.join(gameId)
      currentGameId = gameId
      console.log(`set gameid ${gameId} for player ${username}`)
      io.to(username).emit('gameCreated', userColor, gameId)
      console.log(`game ${gameId} created for player ${username}`)
    })
    socket.on('joinGame', (gameId: string) => {
      const game = activeGames[gameId]
      if (!game) {
        io.to(username).emit('joinedGame', { success: false, message: 'Game does not exist' })
        return
      }
      const { white, black } = game.players
      if (white && black) {
        io.to(username).emit('joinedGame', { success: false, message: 'Room full' })
        return
      }
      socket.join(gameId)
      currentGameId = gameId
      console.log(`set gameid ${gameId} for player ${username}`)
      const freeColor = white ? 'black' : 'white'
      game.players[freeColor] = username
      const opponentName = game.players[opponent(freeColor)]
      io.to(username).emit('joinedGame', { success: true, message: '' }, opponentName, freeColor, gameId)
      io.to(opponentName).emit('joinedGame', { success: true, message: '' }, username, freeColor, gameId)
      console.log('joined to game', gameId)
    })
    socket.on('makeMove', (oldPos: PosType, newPos: PosType) => {
      const game = activeGames[currentGameId].game
      const moves = game.makeMove(Pos.new(oldPos), Pos.new(newPos))
      io.to(currentGameId).emit('getMove', moves, game.isCheck, game.turn)
      const gameOver = game.over()
      if (gameOver) {
        io.to(currentGameId).emit('gameOver', gameOver)
        return
      }
    })

  })

}