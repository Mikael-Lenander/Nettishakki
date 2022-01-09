import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => { res.send('<h1>Shakki backend</h1>'); });

export default app