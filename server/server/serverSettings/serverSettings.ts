import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
const app = express()
require('dotenv').config()

export const server = http.createServer(app)

const corsOptions = {
    origin: process.env.CORS_URL,
    methods: ["POST", "GET", "PUT"],
    credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.text)
app.use(bodyParser.json)

export const io = new Server(server, {
    cors: corsOptions
})
