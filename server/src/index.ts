import http from 'http'
import app from './app'
import socketServer from './socket'
import { PORT } from './utils/config'

const server = http.createServer(app)
socketServer(server, app)

const port = process.env.PORT || PORT

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
