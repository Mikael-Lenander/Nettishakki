import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  const user = req.user
  res.send(user)
})

export default router
