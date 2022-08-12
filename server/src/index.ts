import http from 'http'
import app from './app'
import socketServer from './socket'

const server = http.createServer(app)
socketServer(server)

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
