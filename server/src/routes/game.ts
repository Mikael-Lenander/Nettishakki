import { Router } from 'express'
import gameService from '../services/gameService'

const router = Router()

router.get('/', async (req, res) => {
  const user = req.user
  const games = await gameService.find(user.id)
  res.json(games)
})

export default router
