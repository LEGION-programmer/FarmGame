import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    next()
})
export const server = http.createServer(app)

const corsOptions = {
    origin: '*',
    methods: ["POST", "GET", "PUT"],
    credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.text)
app.use(bodyParser.json)

export const io = new Server(server, {
    cors: corsOptions
})
