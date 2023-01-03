import { Router } from 'express'
import { Game, Move, Token, User } from '../database-models'
import { Server } from 'socket.io'

const router = Router()

// Deletes everything in the database
router.post('/reset', async (req, res) => {
  // @ts-ignore
  await Token.destroy({ where: {} })
  // @ts-ignore
  await Game.destroy({ where: {} })
  // @ts-ignore
  await Move.destroy({ where: {} })
  // @ts-ignore
  await User.destroy({ where: {} })
  const io: Server = req.app.get('io')
  io.disconnectSockets(true)
  res.status(204).end()
})

router.get('/sockets', (req, res) => {
  const io: Server = req.app.get('io')
  const sockets = Array.from(io.sockets.sockets.values()).map(({ data }) => ({
    username: data.username,
    isAuthenticated: data.isAuthenticated
  }))
  res.json(sockets)
})

export default router
