import React, { useState, useEffect } from "react"
import socket from "../socket"
import AppStyle from "../App.module.css"
import playerCss from '../componentsCSS/player.module.css'
import { useNavigate } from "react-router-dom" 
import GameRules from "../components/GameRules"

interface Player {
    nickname: string
    isOwner: boolean
    hisTour: boolean
}

const LobbyPage = () => {
    const [roomId, setRoomId] = useState('')
    const navigate = useNavigate()
    const [playersList, setPlayersList] = useState<Player[]>([])
    const [showRules, setShowRules] = useState(false)
    useEffect(() => {
        const storedRoomId = window.localStorage.getItem('roomId')
        if (storedRoomId) {
            setRoomId(storedRoomId)
        }

    }, [])

    const ownerStartGame = () => {
        socket.emit('owner-start-game', true, roomId)
        navigate('/game')
    }
    const handleReceivePlayers = (playersArray: Player[]) => {
        if(Array.isArray(playersArray)){
        setPlayersList(prevPlayers => {
                const newPlayers = playersArray.filter(newPlayer => 
                !prevPlayers.some(prevPlayer => prevPlayer.nickname === newPlayer.nickname)
                )
                return newPlayers.length > 0 ? [...prevPlayers, ...newPlayers] : prevPlayers
            })
        }
    }
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

    useEffect(() => {   
        socket.emit('get-players', roomId)
        socket.on('send-players-array', handleReceivePlayers)
        socket.on('start-game', (start: boolean) => {
            if(start){
                navigate('/game')
            }
        })
    
        return () => {
            socket.off('send-players-array', handleReceivePlayers)
        }
    }, [socket, roomId, playersList])

    return (
        <div className={AppStyle.con}>
            <div className={AppStyle.bg}>
                <h1 className={AppStyle.headerText}>Room id: {roomId}</h1>
            </div>
            <div className={playerCss.playerList}>
                {playersList.map((player, index) => (
                    <div className={playerCss.card} key={index}>
                        <p className={player.isOwner ? playerCss.owner : playerCss.nickname}>{player.nickname}</p>
                    </div>
                ))}
            </div>
            {window.localStorage.getItem('owner') && playersList.length > 1? 
            (<div className={AppStyle.bg}>
                <h1 className={AppStyle.button} onClick={ownerStartGame}>Start Game</h1>
            </div>)
            :null}
            {showRules ? (
                <div className={AppStyle.rulesList}>
                    <GameRules />
                </div>
            ):null}
            <div className={AppStyle.rules}>
                <h1 className={AppStyle.headerText} onClick={()=>setShowRules(!showRules)}>Rules</h1>
            </div>
        </div>
    )
}

export default LobbyPage

