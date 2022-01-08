import { Server } from 'socket.io'
import http from 'http'
import { ClientToServerEvents, ServerToClientEvents } from 'shared/types'
import { InterServerEvents, SocketData, ActiveGames, GameStatus, Disconnections } from './types'
import { Game, opponent, Pos, PosType } from 'shared/chess'
import { generateUniqueId, randomColor, findGameId } from './utils'

const activeGames: ActiveGames = {}
const disconnections: Disconnections = {}

export default function socketServer(server: http.Server) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  })

  io.on("connection", socket => {
    const username = socket.handshake.query.username as string
    socket.join(username)
    let currentGameId = findGameId(username, activeGames)
    console.log(`User ${username} connected width gameId ${currentGameId}`)
    if (currentGameId) {
      console.log(`Joined back to game ${currentGameId} with user ${username} and timeoutId ${disconnections[username]}`)
      clearTimeout(disconnections[username])
      // delete disconnections[username]
      socket.join(currentGameId)
    }

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
      console.log('activeGames', activeGames)
      socket.join(gameId)
      currentGameId = gameId
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
      const freeColor = white ? 'black' : 'white'
      game.players[freeColor] = username
      const opponentName = game.players[opponent(freeColor)]
      console.log('activeGames', activeGames)
      io.to(username).emit('joinedGame', { success: true, message: '' }, opponentName, freeColor, gameId)
      io.to(opponentName).emit('joinedGame', { success: true, message: '' }, username, freeColor, gameId)
      console.log(`player ${username} joined to game ${gameId}`)
    })
    socket.on('makeMove', (oldPos: PosType, newPos: PosType) => {
      const game = activeGames[currentGameId].game
      const moves = game.makeMove(Pos.new(oldPos), Pos.new(newPos))
      io.to(currentGameId).emit('getMove', moves, game.isCheck, game.turn)
      const gameOver = game.over()
      if (gameOver) {
        io.to(currentGameId).emit('gameOver', gameOver)
        delete activeGames[currentGameId]
      }
    })
    socket.on('disconnect', () => {
      console.log(`User ${username} has disconnected`)
      const currentGame = activeGames[currentGameId]
      if (currentGame) {
        const opponent = currentGame.players.white === username ? 'black' : 'white'
        const timeoutId = setTimeout(() => {
          io.to(currentGameId).emit('gameOver', { winner: opponent, message: 'opponent disconnection' })
          delete activeGames[currentGameId]
          console.log(`Deleted disconnected game ${currentGameId}`)
        }, 10 * 1000)
        console.log(`setting timeout for user ${username} with id ${timeoutId}`)
        disconnections[username] = timeoutId
      }
    })
  })
}