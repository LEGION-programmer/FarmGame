const port = process.env.port || 3001
import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
const app = express()
/*const corsOptions = {
    origin: 'https://main--farm-game-multiplayer.netlify.app',
    methods: ["POST", "GET", "PUT"],
    credentials: true
}*/
app.use(cors())





app.use(bodyParser.text)
app.use(bodyParser.json)
const server = http.createServer(app)

const io = new Server(server, {
    cors: {origin: 'https://main--farm-game-multiplayer.netlify.app',
    methods: ["POST", "GET", "PUT"],
    credentials: true}
})
import User from './actions/createUser'
import UserActions from './actions/userActions'
import { rooms, players, playersInGame, findPlayer, addAnimals, changeTour, 
    exchangeAnimals, gameEnd } from './actions/operations' 


io.on('connection', (socket)=>{
    socket.on('check-room-id', (roomId:string, nickname:string)=>{
        if(rooms.includes(roomId)){
            socket.emit('room-validation', {validationStatus:false})
        }else{
            rooms.push(roomId)
            socket.join(roomId)
            const user:User = new User(nickname, true)
            const usersFromRoom: Array<object> = players.get(roomId) || []
            usersFromRoom.push(user)
            players.set(roomId, usersFromRoom)
            socket.emit('room-validation', {validationStatus:true, roomId})
        }
    })

    socket.on('join-room', (roomId:string, nickname:string)=>{
        if(rooms.includes(roomId)){
            socket.join(roomId)
            const user = new User(nickname, false)
            const usersFromRoom: Array<object> = players.get(roomId) || []
            usersFromRoom.push(user)
            players.set(roomId, usersFromRoom)
            socket.emit('room-validation', {validationStatus:true, roomId})
        }else{
            socket.emit('join-room-res', {validationStatus:false, mess: 'Bad room id'})
        }
    })

    socket.on('get-players', (roomId:string)=>{
        const playersArray: Array<object> = players.get(roomId) || []
        socket.to(roomId).emit('send-players-array', playersArray)
    })

    socket.on('owner-start-game', (start:boolean, roomId:string)=>{
        socket.to(roomId).emit('start-game', start)
    })
    
    socket.on('game-start', (roomId:string, players:Array<string>)=>{
        const userActionsArray: Array<UserActions> = []
        let playerId = 0
        players.forEach((el)=>{
            const user = new UserActions(playerId, el, 1, 0, 0, 0, 0, false, false, false, false, false)
            userActionsArray.push(user)
            playersInGame.set(roomId, userActionsArray)
            playerId++
        })
        const playersArrayFromRoom = playersInGame.get(roomId)

        if (playersArrayFromRoom) {
            if (playersArrayFromRoom.length > 0) {
                const firstPlayer = playersArrayFromRoom[0]
                firstPlayer.rollDiceActive = true
                playersInGame.set(roomId, playersArrayFromRoom)
            } 
        }
        socket.emit('players-ready-to-play', playersArrayFromRoom)
    })

    socket.on('get-player', (data)=>{
        const playersInRoom = playersInGame.get(data.roomId)
        playersInRoom?.forEach((el)=>{
            if(el.nickname == data.nickname){
                socket.emit('received-player', el)
            }
        })
    })

    socket.on('send-dice-res', (data)=>{
        const player:UserActions|null = findPlayer(data.roomId, data.playerId)
        if(player){
            addAnimals(player, data.rollResult[0], data.rollResult[1])
            player.rollDiceActive = false
            player.passActive = true
            player.exchangeActive = true
        }
        const playersData:Array<object>|undefined = playersInGame.get(data.roomId)
        if(gameEnd(player)){
            socket.emit('game-end', player)
            socket.to(data.roomId).emit('game-end', player)
        }
        socket.emit('update-player-animals', playersData)
        socket.to(data.roomId).emit('update-player-animals', playersData)
        socket.emit('roll-res-to-all-players', data.rollResult)
        socket.to(data.roomId).emit('roll-res-to-all-players', data.rollResult)
    })

    socket.on('exchange-animals', (data)=>{
        const player:UserActions|null = findPlayer(data.roomId, data.playerId)
        if(player){
            exchangeAnimals(data.option, player)
            const updateDate = changeTour(data.roomId, data.playerId)
            if(gameEnd(player)){
                socket.emit('game-end', player)
                socket.to(data.roomId).emit('game-end', player)
            }
            socket.emit('update-users', updateDate)
            socket.to(data.roomId).emit('update-users', updateDate)

        }
    })

    socket.on('player-pass', (playerId:number, roomId:string)=> {
        const updateDate = changeTour(roomId, playerId)
        socket.emit('update-player-animals', updateDate)
        socket.to(roomId).emit('update-player-animals', updateDate)
    })

    socket.on('player-leave', (data)=>{
        const playersArr:Array<UserActions>|undefined = playersInGame.get(data.roomId)
        if(playersArr){
            if(data.isOwner){
                playersInGame.delete(data.roomId)
                players.delete(data.roomId)
                socket.emit('owner-leave', true)
                socket.to(data.roomId).emit('owner-leave', true)
            }else{
                const player:number = playersArr.findIndex(el=>el.id===data.playerId)
                    playersArr.splice(player, 1)
                    playersInGame.set(data.roomId, playersArr)
                    players.set(data.roomId, playersArr)
                    socket.emit('send-players-array', players)
                    socket.to(data.roomId).emit('send-players-array', players)
            }
        }
    })
})

server.listen(port, () => {
    console.log(`Serwer working on port: ${port}`)
})