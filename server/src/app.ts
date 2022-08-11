import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectToDatabase } from './utils/db'

const app = express()
connectToDatabase()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (_req, res) => { res.send('<h1>Shakki backend</h1>'); });

export default app