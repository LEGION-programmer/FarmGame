import React, { useState, useEffect } from "react"
import PlayersInGame from "../components/PlayersInGame"
import PlayerPulpit from "../components/PlayerPulpit"
import RollAnimation from "../components/RollAnimation"
import GameEnd from "./GameEnd"
import socket from "../socket"

const GamePage = () => {
    const [ifGameEnd, setIfGameEnd] = useState(false)
    const [winnerNickname, setWinnerNickname] = useState<string>('')

    
    const leaveTheGame = () => {
        const data = {
            roomId: window.localStorage.getItem('roomId'),
            playerId: Number(window.localStorage.getItem('playerId')),
            isOwner: window.localStorage.getItem('owner') || false
        }
        socket.emit('player-leave', data)
        window.localStorage.clear()
    }

    window.addEventListener('beforeunload', ()=>{leaveTheGame()})
    useEffect(()=>{
        socket.on('game-end', (player:any)=>{
            if(player){
                setIfGameEnd(true)
                setWinnerNickname(player.nickname)
            }
        })

    }, [socket])
    
    return (
        <div>
            {!ifGameEnd ? (
            <div>
                <div>
                    <PlayersInGame />
                </div>
                <div>
                    <RollAnimation />
                </div>
                <div>
                    <PlayerPulpit />
                </div>
            </div>
            ):(
                <div>
                    <GameEnd winnerNickname={winnerNickname}/>
                </div>
            )}
        </div>
    )
}

export default GamePage