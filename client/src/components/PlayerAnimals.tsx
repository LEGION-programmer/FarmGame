import React, { useState, useEffect } from "react"
import socket from "../socket"
import PlayerCss from '../componentsCSS/player.module.css'

interface Animals {
    rabbits: number,
    sheeps: number,
    pigs: number,
    cows: number,
    horses: number,
    smallDog: boolean,
    bigDog: boolean
}

const PlayerAnimals = () => {
    const [player, setPlayer] = useState<Animals>()

    useEffect(() => {
        socket.on('received-player', (player)=>{
            setPlayer(player)
        })

        return () => {
            socket.off('received-player')
        }
    }, [socket, player])

    return (
        <div>
            {player ? (
                <div>
 <div className={PlayerCss.animals}>
                <img src={require('../assets/rabbit.png')} alt="animal" className={PlayerCss.image}/>
                <p>{player.rabbits}</p>
            </div>
            <div className={PlayerCss.animals}>
                <img src={require('../assets/sheep.png')} alt="animal" className={PlayerCss.image}/>
                <p>{player.sheeps}</p>
            </div>
            <div className={PlayerCss.animals}>
                <img src={require('../assets/pig.png')} alt="animal" className={PlayerCss.image}/>
                <p>{player.pigs}</p>
            </div>
            <div className={PlayerCss.animals}>
                <img src={require('../assets/cow.png')} alt="animal" className={PlayerCss.image}/>
                <p>{player.cows}</p>
            </div>
            <div className={PlayerCss.animals}>
                <img src={require('../assets/horse.png')} alt="animal" className={PlayerCss.image}/>
                <p>{player.horses}</p>
            </div>
            <div className={PlayerCss.animals}>
                <img src={require('../assets/smallDog.png')} alt="animal" 
                className={player.smallDog ? PlayerCss.animals : PlayerCss.notActive}/>
            </div>
            <div className={PlayerCss.animals}>
                <img src={require('../assets/bigDog.png')} alt="animal" 
                className={player.bigDog ? PlayerCss.animals : PlayerCss.notActive}/>
            </div>
                </div>
            ):null}  
        </div>
    )
}

export default PlayerAnimals