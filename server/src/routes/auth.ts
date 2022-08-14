import { Router } from 'express'
import authService from '../services/authService'
import toNewUser, { UserFields } from '../utils/parsers/toNewUser'
// import * as jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', (_req, res) => {
  res.send('xd')
})

router.post('/signup', async (req, res) => {
  try {
    const newUser = toNewUser(req.body as UserFields)
    if (newUser.password !== newUser.repeatPassword) return res.status(400).json({ error: "Passwords don't match" })
    if (newUser.password.length < 5) return res.status(400).json({ error: 'Password must be at least 5 characters long' })
    if (newUser.password.length > 30) return res.status(400).json({ error: 'Password must be at most 30 characters long' })
    await authService.createUser(newUser)
    res.status(204)
  } catch (error) {
    const errorMessage = error.errors ? error.errors[0].message : error.message
    res.status(400).json({ error: errorMessage })
  }
})

export default router
