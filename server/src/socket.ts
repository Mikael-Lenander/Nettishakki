import { Server } from 'socket.io'
import http from 'http'
import { SocketData, InterServerEvents } from './types'
import { Pos, PosType, ClientToServerEvents, ServerToClientEvents, GameOverCondition
 } from 'shared'
import { verifyToken } from './utils/middleware'
import { parseString } from './utils/parsers/parsers'
import GameController from './model/GameController'
import gameService from './services/gameService'

const activeGames = new GameController()

export default function socketServer(server: http.Server) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://nettishakki.netlify.app']
    }
  })

  io.use((socket, next) => {
    try {
      const token = parseString(socket.handshake.auth.token, 'authentication token')
      const user = verifyToken(token)
      socket.data = {
        username: user.username,
        userId: user.id,
        isAuthenticated: true
      }
      console.log('socket.data', socket.data)
      next()
    } catch (error) {
      const guestUsername = socket.handshake.query.username as string
      socket.data = {
        username: guestUsername,
        isAuthenticated: false
      }
      console.log('socket.data', socket.data)
      next()
    }
  })

  io.on('connection', async socket => {
    const username = parseString(socket.data.username, 'username')
    await socket.join(username)
    let currentGameId = activeGames.findWithPlayer(username)
    console.log(`User ${username} connected width gameId ${currentGameId}`)
    if (currentGameId) {
      console.log(`Joined back to game ${currentGameId} with user ${username} and timeoutId ${activeGames.disconnections[username]}`)
      activeGames.reconnect(username)
      await socket.join(currentGameId)
    }

    socket.on('createGame', async () => {
      if (!username) return console.log('no user')
      if (activeGames.findOnGoingWithPlayer(username)) {
        console.log(`Error on createGame due to player ${username} already having an active game`)
        io.to(username).emit('gameCreated', {
          success: false,
          message: 'You already have an ongoing game'
        })
        return
      }
      activeGames.removeWithPlayer(username)
      const currentGame = activeGames.new(username, socket.data.isAuthenticated)
      currentGameId = currentGame.id
      console.log(
        'activeGames',
        activeGames.games.map(game => game.id)
      )
      await socket.join(currentGameId)
      io.to(username).emit('gameCreated', { success: true, message: '' }, currentGame.playerColor(username), currentGameId)
      console.log(`game ${currentGameId} created for player ${username}`)
    })

    socket.on('joinGame', async (gameId: string) => {
      const game = activeGames.find(gameId)
      // if (activeGame && activeGame.hasPlayer(username)) {
      //   io.to(username).emit('joinedGame', { success: true, message: '' }, activeGame.opponent(username).color, player.color, gameId)
      // }
      if (activeGames.findOnGoingWithPlayer(username)) {
        io.to(username).emit('joinedGame', {
          success: false,
          message: 'You already have an ongoing game'
        })
        return
      }
      if (!game) {
        io.to(username).emit('joinedGame', {
          success: false,
          message: 'Game does not exist'
        })
        return
      }
      if (game.isOn()) {
        io.to(username).emit('joinedGame', {
          success: false,
          message: 'Room full'
        })
        return
      }
      activeGames.removeWithPlayer(username)
      await socket.join(gameId)
      currentGameId = game.id
      const player = game.addPlayer(username, socket.data.isAuthenticated)
      const opponent = game.opponent(username)
      console.log(
        'activeGames',
        activeGames.games.map(game => game.id)
      )
      io.to(username).emit('joinedGame', { success: true, message: '' }, opponent.username, player.color, gameId)
      io.to(opponent.username).emit('joinedGame', { success: true, message: '' }, username)
      console.log(`player ${username} joined to game ${gameId}`)
    })

    socket.on('makeMove', async (oldPos: PosType, newPos: PosType) => {
      const activeGame = activeGames.find(currentGameId)
      if (!activeGame) return
      const game = activeGame.game
      const moves = game.makeMove(Pos.new(oldPos), Pos.new(newPos))
      io.to(currentGameId).emit('getMove', moves, game.isCheck, game.turn)
      const gameOver = game.over()
      if (gameOver) {
        io.to(currentGameId).emit('gameOver', gameOver)
        await gameService.saveGame(activeGame)
        activeGames.remove(currentGameId)
        currentGameId = ''
        console.log(`game over by ${gameOver.message}`)
        console.log('active games', activeGames.games)
        console.log('current game', currentGameId)
      }
    })

    socket.on('disconnect', () => {
      console.log(`User ${username} has disconnected`)
      const game = activeGames.find(currentGameId)
      if (game) {
        const opponent = game.opponent(username)

        const timeoutId = setTimeout(async () => {
          const game = activeGames.find(currentGameId)
          if (game && game.isOn()) {
            io.to(currentGameId).emit('gameOver', {
              winner: opponent.color,
              message: GameOverCondition.Disconnection
            })
            console.log(`Gameover message sent to player ${opponent.username}`)
          }
          if (game) {
            await gameService.saveGame(game, opponent.username, GameOverCondition.Disconnection)
          }
          activeGames.remove(currentGameId)
          console.log(`Deleted disconnected game ${currentGameId}`)
          console.log('active games', activeGames.games)
        }, 10 * 1000)

        console.log(`setting timeout for user ${username} with id ${timeoutId}`)
        activeGames.disconnect(username, timeoutId)
      }
    })
  })
}
