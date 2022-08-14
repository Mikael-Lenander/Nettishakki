import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectToDatabase } from './utils/db'
import './database-models'
import { runMigrations } from './utils/db'
import authRouter from './routes/auth'

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

app.get('/', (_req, res) => {
  res.send('<h1>Shakki backend</h1>')
})

export default app
