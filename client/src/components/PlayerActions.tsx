import React, { useEffect, useState } from "react"
import socket from "../socket"
import PlayerCardCss from '../componentsCSS/playerCard.module.css'
import AppCss from '../App.module.css'

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

const PlayerActions = () => {
    const [player, setPlayer] = useState<Player | null>(null)
    const [diceActive, setDiceActive] = useState(false)
    const [passActive, setPassActive] = useState(false)
    const firstDice = ['rabbit', 'rabbit', 'rabbit', 'rabbit', 'rabbit', 'rabbit', 'sheep', 'sheep', 'sheep', 'pig', 'cow', 'wolf']
    const secondDice = ['rabbit', 'rabbit', 'rabbit', 'rabbit', 'rabbit', 'rabbit', 'sheep', 'sheep', 'sheep', 'pig', 'horse', 'fox']

    const rollDice = () => {
        const firstRandomIndex = Math.floor(Math.random() * firstDice.length)
        const secondRandomIndex = Math.floor(Math.random() * secondDice.length)
        const res:Array<string> = []
        res.push(firstDice[firstRandomIndex])
        res.push(secondDice[secondRandomIndex])
        setPassActive(true)
        setDiceActive(false)
        window.localStorage.setItem('rollResultFirst',res[0])
        window.localStorage.setItem('rollResultSecond',res[1])
        if(player){
            player.hisTour=false
        }
        const data = {rollResult: res, roomId:window.localStorage.getItem('roomId')}
        socket.emit('send-dice-res', data)
    }

    const pass = () => {

    }

    useEffect(() => {
        socket.on('received-player', (player:Player)=>{
            setPlayer(player)
            if(player.hisTour){
                setDiceActive(true)
            }
        })

    }, [socket])

    return (
        <div className={PlayerCardCss.playerActions}>
            <div onClick={diceActive ? ()=>{rollDice()} : ()=>null}
            className={diceActive ? PlayerCardCss.dice : PlayerCardCss.diceDisable}>
                <h1>ROLL THE DICE</h1>
            </div>
            <div onClick={passActive ? ()=>pass() : ()=>null}
            className={passActive ? PlayerCardCss.pass : PlayerCardCss.passDisable}>
                <h1>PASS</h1>
            </div>
        </div>  
    )
}

export default PlayerActions 