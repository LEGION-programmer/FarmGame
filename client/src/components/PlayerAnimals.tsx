import React, { useState, useEffect } from "react"
import socket from "../socket"
import PlayerCss from '../componentsCSS/player.module.css'

interface Animals {
    id: number
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
        socket.on('update-player-animals', (data:Animals[])=>{
            let newAnimals
            data.forEach(element => {
                if(element.id==Number(window.localStorage.getItem('playerId'))){
                    newAnimals = element
                }
            })
            setPlayer(newAnimals)
        })

        socket.on('update-users', (player:Animals[])=>{
            player.forEach((el)=>{
                if(el.id === Number(window.localStorage.getItem('playerId'))){
                    setPlayer(el)
                }
            })
        })
        
    }, [socket, player])

    return (
        <div>
            {player ? (
                
                <div>
                    <div className={PlayerCss.animals}>
                        <img src={require('../assets/rabbit.png')} alt="animal"/>
                        <p>{player.rabbits}</p>
                    </div>
                    <div className={PlayerCss.animals}>
                        <img src={require('../assets/sheep.png')} alt="animal"/>
                        <p>{player.sheeps}</p>
                    </div>
                    <div className={PlayerCss.animals}>
                        <img src={require('../assets/pig.png')} alt="animal"/>
                        <p>{player.pigs}</p>
                    </div>
                    <div className={PlayerCss.animals}>
                        <img src={require('../assets/cow.png')} alt="animal"/>
                        <p>{player.cows}</p>
                    </div>
                    <div className={PlayerCss.animals}>
                        <img src={require('../assets/horse.png')} alt="animal"/>
                        <p>{player.horses}</p>
                    </div>
                    <div className={PlayerCss.animals}>
                        <img src={require('../assets/smallDog.png')} alt="animal" 
                        className={player.smallDog ? '' : PlayerCss.smallDogNotActive}/>
                    </div>
                    <div className={PlayerCss.animals}>
                        <img src={require('../assets/bigDog.png')} alt="animal" 
                        className={player.bigDog ? '' : PlayerCss.bigDogNotActive}/>
                    </div>
                </div>
            ):null}
        </div>
    )
}

export default PlayerAnimals