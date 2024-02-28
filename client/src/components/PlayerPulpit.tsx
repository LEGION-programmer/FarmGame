import React, { useState, useEffect } from "react"
import AppCss from '../App.module.css'
import PlayerCss from '../componentsCSS/player.module.css'
import socket from "../socket"
import PlayerAnimals from "./PlayerAnimals"
import AnimalExchange from "./AnimalExchange"
import PlayerActions from "./PlayerActions"

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
        socket.on('received-player', (player:Player)=>{
            setPlayer(player)
        })
        
        return () => {
            socket.off('received-player')
        }
    }, [socket])

    return(
        <div className={AppCss.con}>
            <div className={PlayerCss.playerPulpit}>
                <div className={PlayerCss.playerSection}>
                    <PlayerAnimals />
                </div>
                <hr className={PlayerCss.hr} />
                <div className={PlayerCss.playerSection}>
                    <AnimalExchange />
                </div>
                <hr className={PlayerCss.hr} />
                <div className={PlayerCss.playerSection}>
                    <PlayerActions />
                </div>
            </div>
        </div>
    )
}

export default PlayerPulpit