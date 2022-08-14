import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectToDatabase } from './utils/db'
import './database-models'
import { runMigrations } from './utils/db'
import authRouter from './routes/auth'
import userRouter from './routes/user'
import gameRouter from './routes/game'
import { authenticateToken } from './utils/middleware'

const app = express()

const initDatabase = async () => {
  await connectToDatabase()
  await runMigrations()
}

initDatabase()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/games', authenticateToken, gameRouter)

app.get('/', (_req, res) => {
  res.send('<h1>Shakki backend</h1>')
})

export default app
