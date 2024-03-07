const port = process.env.port || 3001
import { io, server } from './serverSettings/serverSettings'
import User from './actions/createUser'
import UserActions from './actions/userActions'
import { rooms, players, playersInGame, findPlayer, addAnimals, changeTour, exchangeAnimals } from './actions/operations' 


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
            const user = new UserActions(playerId, el, false, 1, 0, 0, 0, 0, false, false)
            userActionsArray.push(user)
            playersInGame.set(roomId, userActionsArray)
            playerId++
        })
        const playersArrayFromRoom = playersInGame.get(roomId)

        if (playersArrayFromRoom) {
            if (playersArrayFromRoom.length > 0) {
                const firstPlayer = playersArrayFromRoom[0]
                firstPlayer.hisTour = true
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
        }
        const playersData:Array<object>|undefined = playersInGame.get(data.roomId)

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
            socket.emit('update-users', updateDate)
            socket.to(data.roomId).emit('update-users', updateDate)
            socket.emit('update-player-animals', updateDate)
            socket.to(data.roomId).emit('update-player-animals', updateDate)
        }
    })

    socket.on('player-pass', (playerId:number, roomId:string)=> {
        const updateDate = changeTour(roomId, playerId)
        socket.to(roomId).emit('update-users', updateDate)
    })
})

server.listen(port, () => {
    console.log(`Serwer working on port: ${port}`)
})