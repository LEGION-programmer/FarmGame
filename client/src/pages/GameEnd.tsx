import React, { useState, useEffect } from "react"
import socket from "../socket"
import AppCss from '../App.module.css'
import PlayerCss from '../componentsCSS/player.module.css'
import { useNavigate } from "react-router-dom"

const GameEnd = ({winnerNickname}: any) => {
    const navigate = useNavigate()

    const backToLobby = () => {
        navigate('/lobby')
    }

    const leaveTheGame = () => {
        const data = {
            roomId: window.localStorage.getItem('roomId'),
            playerId: Number(window.localStorage.getItem('playerId')),
            isOwner: window.localStorage.getItem('owner') || false
        }
        socket.emit('player-leave', data)
        window.localStorage.clear()
        navigate('/')
    }

    useEffect(()=>{
        socket.on('owner-leave', (ownerLeave:boolean)=>{
            if(ownerLeave){
                navigate('/')
            }
        })
    }, [socket])
    
    return (
        <div className={AppCss.con}>
            {winnerNickname ? (
            <div className={AppCss.bg}>
                <h1 className={AppCss.headerText}>{winnerNickname} is the best farmer in the world!</h1>
                <hr className={PlayerCss.hr}/>
                <p className={AppCss.button} onClick={()=> backToLobby()}>BACK TO LOBBY</p>
                <hr className={PlayerCss.hr}/>
                <p className={AppCss.button} onClick={()=> leaveTheGame()}>LEAVE THE GAME</p>
            </div>
            ):null}
        </div>
    )
}

export default GameEnd