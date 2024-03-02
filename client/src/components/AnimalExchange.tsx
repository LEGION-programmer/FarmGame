import React, { useState, useEffect, useRef } from "react"
import socket from "../socket"
import PlayerCss from '../componentsCSS/player.module.css'

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

const AnimalExchange = () => {
    const [player, setPlayer] = useState<Player | null>(null)

    useEffect(() => {
        socket.on('received-player', (player:Player)=>{
            setPlayer(player)
        })

    }, [socket])

    return (
        <div>
            {player ? (
                <div className={PlayerCss.con}>
                    <div className={player?.rabbits >= 6 ? PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}>
                        <img src={require('../assets/rabbit.png')} alt="animal" />
                        <p>6 &#x21d2; 1</p>
                        <img src={require('../assets/sheep.png')} alt="animal" />
                    </div>
                    <div className={player?.sheeps >= 2 ? PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}>
                        <img src={require('../assets/sheep.png')} alt="animal" />
                        <p>2 &#x21d2; 1</p>
                        <img src={require('../assets/pig.png')} alt="animal" />
                    </div>
                    <div className={player?.pigs >= 3 ? PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}>
                        <img src={require('../assets/pig.png')} alt="animal" />
                        <p>3 &#x21d2; 1</p>
                        <img src={require('../assets/cow.png')} alt="animal" />
                    </div>
                </div>
            ):null}
             {player ? (
                <div className={PlayerCss.con}>
                    <div className={player?.cows >= 2 ? PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}>
                        <img src={require('../assets/cow.png')} alt="animal" />
                        <p>2 &#x21d2; 1</p>
                        <img src={require('../assets/horse.png')} alt="animal" />
                    </div>
                    <div className={player?.sheeps >= 1 ? PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}>
                        <img src={require('../assets/sheep.png')} alt="animal" />
                        <p>1 &#x21d2; 1</p>
                        <img src={require('../assets/smallDog.png')} alt="animal" />
                    </div>
                    <div className={player?.cows >= 1 ? PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}>
                        <img src={require('../assets/cow.png')} alt="animal" />
                        <p>1 &#x21d2; 1</p>
                        <img src={require('../assets/bigDog.png')} alt="animal" />
                    </div>
                </div>
            ):null}
        </div>
    )
}

export default AnimalExchange