import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io'
import { NextApiResponseServerIO } from '../../../types/next'

export const config = {
    api: {
        bodyParser: false,
    },
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        const httpServer: NetServer = res.socket.server as any
        const io = new ServerIO(httpServer, {
            path: '/api/socket',
        })
        res.socket.server.io = io

        io.on('connection', (socket) => {
            console.log('New client connected')

            socket.on('new todo', (todo) => {
                io.emit('new todo', todo)
            })

            socket.on('update todo', (todo) => {
                io.emit('update todo', todo)
            })

            socket.on('delete todo', (todoId) => {
                io.emit('delete todo', todoId)
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })
    }
    res.end()
}

export { ioHandler as GET, ioHandler as POST }