import React, { useEffect, useState } from "react"
import socket from "../socket"
import PlayerCardCss from '../componentsCSS/playerCard.module.css'

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
    rollDiceActive: boolean
    passActive: boolean
    exchangeActive: boolean
}

const PlayerActions = () => {
    const [player, setPlayer] = useState<Player | null>(null)
    const [playerId, setPlayerId] = useState<number | null>(null)
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
        const data = {
            rollResult: ['rabbit', 'rabbit'], 
            roomId: window.localStorage.getItem('roomId'),
            playerId: Number(window.localStorage.getItem('playerId'))
        }
        socket.emit('send-dice-res', data)
    }

    const pass = () => {
        socket.emit('player-pass', playerId, window.localStorage.getItem('roomId'))
        setPassActive(false)
    }

    useEffect(() => {
        socket.on('received-player', (player:Player)=>{
            if(player){
                setPlayer(player)
                let id = player.id
                window.localStorage.setItem('playerId', `${id}`)
                setPlayerId(player.id)
            }
        }) 

        socket.on('update-player-animals', (player:Player[])=>{
           player.forEach((el)=>{
            if(el.id === Number(window.localStorage.getItem('playerId'))){
                setPlayer(el)
            }
           })
        })

        socket.on('update-users', (player:Player)=>{
            setPlayer(player)       
        })

        if(player?.rollDiceActive){
            setDiceActive(true)
        }

        if(player?.passActive){
            setPassActive(true)
        }

    }, [socket, player])

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