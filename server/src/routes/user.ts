import { Router } from 'express'
import { toNewUser } from '../utils/parsers/toUser'
import { Fields, NewUser } from '../types'
import userService from '../services/userService'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const newUser = toNewUser(req.body as Fields<NewUser>)
    if (newUser.password !== newUser.repeatPassword) return res.status(400).json({ error: "Passwords don't match" })
    if (newUser.password.length < 5) return res.status(400).json({ error: 'Password must be at least 5 characters long' })
    if (newUser.password.length > 30) return res.status(400).json({ error: 'Password must be at most 30 characters long' })
    await userService.create(newUser)
    res.status(201)
  } catch (error) {
    const errorMessage = error.errors ? error.errors[0].message : error.message
    res.status(400).json({ error: errorMessage })
  }
})

export default router
