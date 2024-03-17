import React, { useState, useEffect } from "react"
import socket from "../socket"
import AppCss from '../App.module.css'
import PlayerCss from '../componentsCSS/player.module.css'
import { useNavigate } from "react-router-dom"

const GameEnd = () => {
    const [winner, setWinner] = useState('')
    const navigate = useNavigate()

    const backToLobby = () => {
        navigate('/lobby')
    }

    useEffect(()=>{
        socket.on('game-end', (player):any=>{
            setWinner(player)
            console.log(player)
        })
    })
    console.log(winner)
    return (
        <div className={AppCss.con}>
            <div className={AppCss.bg}>
                <h1 className={AppCss.headerText}>{winner} is the best farmer in the world!</h1>
                <hr className={PlayerCss.hr}/>
                <p className={AppCss.button} onClick={()=> backToLobby()}>BACK TO LOBBY</p>
                <hr className={PlayerCss.hr}/>
                <p className={AppCss.button}>LEAVE THE GAME</p>
            </div>
        </div>
    )
}

export default GameEnd