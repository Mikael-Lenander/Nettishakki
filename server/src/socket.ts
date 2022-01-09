import { Server } from 'socket.io'
import http from 'http'
import { InterServerEvents, SocketData } from './types'
import { Pos, PosType, ClientToServerEvents, ServerToClientEvents } from 'shakki'
import GameController from './model/GameController'

const games = new GameController()

export default function socketServer(server: http.Server) {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  })

  io.on("connection", socket => {
    const username = socket.handshake.query.username as string
    socket.join(username)
    let currentGameId = games.findWithPlayer(username)
    console.log(`User ${username} connected width gameId ${currentGameId}`)
    if (currentGameId) {
      console.log(`Joined back to game ${currentGameId} with user ${username} and timeoutId ${games.disconnections[username]}`)
      games.reconnect(username)
      socket.join(currentGameId)
    }

    socket.on('createGame', () => {
      if (!username) return console.log('no user')
      if (games.findActiveWithPlayer(username)) {
        console.log(`Error on createGame due to player ${username} already having an active game`)
        io.to(username).emit('gameCreated', { success: false, message: 'You already have an ongoing game' })
        return
      }
      games.removeWithPlayer(username)
      const currentGame = games.new(username)
      currentGameId = currentGame.id
      console.log('activeGames', games.games)
      socket.join(currentGameId)
      io.to(username).emit('gameCreated', { success: true, message: '' }, currentGame.playerColor(username), currentGameId)
      console.log(`game ${currentGameId} created for player ${username}`)
    })

    socket.on('joinGame', (gameId: string) => {
      const game = games.find(gameId)
      // if (activeGame && activeGame.hasPlayer(username)) {
      //   io.to(username).emit('joinedGame', { success: true, message: '' }, activeGame.opponent(username).color, player.color, gameId)
      // }
      if (games.findActiveWithPlayer(username)) {
        io.to(username).emit('joinedGame', { success: false, message: 'You already have an ongoing game' })
        return
      }
      if (!game) {
        io.to(username).emit('joinedGame', { success: false, message: 'Game does not exist' })
        return
      }
      if (game.isActive()) {
        io.to(username).emit('joinedGame', { success: false, message: 'Room full' })
        return
      }
      games.removeWithPlayer(username)
      socket.join(gameId)
      currentGameId = game.id
      const player = game.addPlayer(username)
      const opponent = game.opponent(username)
      console.log('activeGames', games.games)
      io.to(username).emit('joinedGame', { success: true, message: '' }, opponent.username, player.color, gameId)
      io.to(opponent.username).emit('joinedGame', { success: true, message: '' }, username)
      console.log(`player ${username} joined to game ${gameId}`)
    })

    socket.on('makeMove', (oldPos: PosType, newPos: PosType) => {
      const game = games.find(currentGameId)?.game
      if (!game) return
      const moves = game.makeMove(Pos.new(oldPos), Pos.new(newPos))
      io.to(currentGameId).emit('getMove', moves, game.isCheck, game.turn)
      const gameOver = game.over()
      if (gameOver) {
        io.to(currentGameId).emit('gameOver', gameOver)
        games.remove(currentGameId)
        currentGameId = ''
        console.log('game over by checkmate')
        console.log('active games', games.games)
        console.log('current game', currentGameId)
      }
    })

    socket.on('disconnect', () => {
      console.log(`User ${username} has disconnected`)
      const game = games.find(currentGameId)
      if (game) {
        const opponent = game.opponent(username)

        const timeoutId = setTimeout(() => {
          const game = games.find(currentGameId)
          if (game && game.isActive()) {
            io.to(currentGameId).emit('gameOver', { winner: opponent.color, message: 'opponent disconnection' })
            console.log(`Gameover message sent to player ${opponent.username}`)
          }
          games.remove(currentGameId)
          console.log(`Deleted disconnected game ${currentGameId}`)
          console.log('active games', games.games)
        }, 10 * 1000)

        console.log(`setting timeout for user ${username} with id ${timeoutId}`)
        games.disconnect(username, timeoutId)
      }

    })
  })
}