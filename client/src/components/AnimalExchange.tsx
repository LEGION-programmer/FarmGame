import React, { useState, useEffect, useRef } from "react"
import socket from "../socket"
import PlayerCss from '../componentsCSS/player.module.css'

interface Player {
    id: number
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
    const [player, setPlayer] = useState<Player>()

    const exchangeAnimals = (operationNumber:number) => {
        const data = {
            roomId: window.localStorage.getItem('roomId'),
            playerId: Number(window.localStorage.getItem('playerId')),
            option: operationNumber
        }
        socket.emit('exchange-animals', data)
    }

    useEffect(() => {
        socket.on('received-player', (player:Player)=>{
            setPlayer(player)
        })

        socket.on('update-player-animals', (data:Player[])=>{
            let newAnimals
            data.forEach(element => {
                if(element.id==Number(window.localStorage.getItem('playerId'))){
                    newAnimals = element
                }
            })
            setPlayer(newAnimals)
        })
        
    }, [socket])

    return (
        <div>
            {player ? (
                <div className={PlayerCss.con}>
                    <div className={player.rabbits >= 6 && player.hisTour ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.rabbits >= 6 && player.hisTour ? 
                    ()=>{exchangeAnimals(1)} : ()=>null}>
                        <img src={require('../assets/rabbit.png')} alt="animal" />
                        <p>6 &#x21d2; 1</p>
                        <img src={require('../assets/sheep.png')} alt="animal" />
                    </div>
                    <div className={player.sheeps >= 2 && player.hisTour ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.sheeps >= 2 && player.hisTour ? 
                    ()=>{exchangeAnimals(2)} : ()=>null}>
                        <img src={require('../assets/sheep.png')} alt="animal" />
                        <p>2 &#x21d2; 1</p>
                        <img src={require('../assets/pig.png')} alt="animal" />
                    </div>
                    <div className={player.pigs >= 3 && player.hisTour ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.pigs >= 3 && player.hisTour ? 
                    ()=>{exchangeAnimals(3)} : ()=>null}>
                        <img src={require('../assets/pig.png')} alt="animal" />
                        <p>3 &#x21d2; 1</p>
                        <img src={require('../assets/cow.png')} alt="animal" />
                    </div>
                </div>
            ):null}
             {player ? (
                <div className={PlayerCss.con}>
                    <div className={player.cows >= 2 && player.hisTour ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.cows >= 2 && player.hisTour ? 
                    ()=>{exchangeAnimals(4)} : ()=>null}>
                        <img src={require('../assets/cow.png')} alt="animal" />
                        <p>2 &#x21d2; 1</p>
                        <img src={require('../assets/horse.png')} alt="animal" />
                    </div>
                    <div className={player.sheeps >= 1 && player.hisTour ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.sheeps >= 1 && player.hisTour && !player.smallDog? 
                    ()=>{exchangeAnimals(5)} : ()=>null}>
                        <img src={require('../assets/sheep.png')} alt="animal" />
                        <p>1 &#x21d2; 1</p>
                        <img src={require('../assets/smallDog.png')} alt="animal" />
                    </div>
                    <div className={player.cows >= 1 && player.hisTour ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.cows >= 1 && player.hisTour && !player.bigDog? 
                    ()=>{exchangeAnimals(6)} : ()=>null}>
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