import React, { useState, useEffect } from "react"
import socket from "../socket"
import PlayerCss from '../componentsCSS/player.module.css'

interface Player {
    id: number
    nickname: string
    rabbits: number
    sheeps: number
    pigs: number
    cows: number
    horses: number
    smallDog: boolean
    bigDog: boolean
    exchangeActive: boolean
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
    
        socket.on('update-player-animals', (player:Player[])=>{
            player.forEach((el)=>{
                if(el.id === Number(window.localStorage.getItem('playerId'))){
                    setPlayer(el)
                }
            })
        })

        socket.on('update-users', (player:Player[])=>{
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
                <div className={PlayerCss.con}>
                    <div className={player.rabbits >= 6 && player.exchangeActive ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.rabbits >= 6 && player.exchangeActive ? 
                    ()=>{exchangeAnimals(1)} : ()=>null}>
                        <img src={require('../assets/rabbit.png')} alt="animal" />
                        <p>6 &#x21d2; 1</p>
                        <img src={require('../assets/sheep.png')} alt="animal" />
                    </div>
                    <div className={player.sheeps >= 2 && player.exchangeActive ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.sheeps >= 2 && player.exchangeActive ? 
                    ()=>{exchangeAnimals(2)} : ()=>null}>
                        <img src={require('../assets/sheep.png')} alt="animal" />
                        <p>2 &#x21d2; 1</p>
                        <img src={require('../assets/pig.png')} alt="animal" />
                    </div>
                    <div className={player.pigs >= 3 && player.exchangeActive ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.pigs >= 3 && player.exchangeActive ? 
                    ()=>{exchangeAnimals(3)} : ()=>null}>
                        <img src={require('../assets/pig.png')} alt="animal" />
                        <p>3 &#x21d2; 1</p>
                        <img src={require('../assets/cow.png')} alt="animal" />
                    </div>
                </div>
            ):null}
             {player ? (
                <div className={PlayerCss.con}>
                    <div className={player.cows >= 2 && player.exchangeActive ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.cows >= 2 && player.exchangeActive ? 
                    ()=>{exchangeAnimals(4)} : ()=>null}>
                        <img src={require('../assets/cow.png')} alt="animal" />
                        <p>2 &#x21d2; 1</p>
                        <img src={require('../assets/horse.png')} alt="animal" />
                    </div>
                    <div className={player.sheeps >= 1 && player.exchangeActive && !player.smallDog ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.sheeps >= 1 && player.exchangeActive && !player.smallDog? 
                    ()=>{exchangeAnimals(5)} : ()=>null}>
                        <img src={require('../assets/sheep.png')} alt="animal" />
                        <p>1 &#x21d2; 1</p>
                        <img src={require('../assets/smallDog.png')} alt="animal" />
                    </div>
                    <div className={player.cows >= 1 && player.exchangeActive && !player.bigDog ? 
                    PlayerCss.exchangeBox : PlayerCss.exchangeBoxDisable}
                    onClick={player.cows >= 1 && player.exchangeActive && !player.bigDog? 
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