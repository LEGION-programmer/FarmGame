import React, { useState, useEffect } from "react"
import AppCss from '../App.module.css'
import socket from "../socket"

interface Player {
    nickname: string
    hisTour:boolean
    rabbits: number
    sheeps: number
    pigs: number
    cows: number
    horses: number
    smallDog: boolean
    bigDog: boolean
}

const PlayerPulpit = () => {
    const [player, setPlayer] = useState<Player | null>(null)

    useEffect(() => {
        socket.emit('get-player', {nickname: window.localStorage.getItem('nickname'), 
        roomId: window.localStorage.getItem('roomId')})
        socket.on('received-player', (player:Player)=>{
            console.log(player)
            setPlayer(player)
        })
    }, [socket])
    
    return(
        <div>

        </div>
    )
}

export default PlayerPulpit