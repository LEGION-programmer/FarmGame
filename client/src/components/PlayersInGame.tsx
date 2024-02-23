import React, { useState, useEffect } from "react"
import socket from "../socket"
import playerCardCss from "../componentsCSS/playerCard.module.css"
import playerCss from "../componentsCSS/player.module.css"
import AppStyle from "../App.module.css"

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

interface PrevPlayers {
    nickname: string
}

const PlayersInGame = () => {
    const [players, setPlayers] = useState<Player[]>([])
    const roomId:string = window.localStorage.getItem('roomId') || ''
    useEffect(()=>{
        socket.emit('get-players', roomId)
        socket.on('send-players-array', (playersArray:Array<PrevPlayers>):any=>{
            const playersNicknames:Array<string> = []
            playersArray.forEach((el)=>{
                playersNicknames.push(el.nickname)
            })

            socket.emit('game-start', window.localStorage.getItem('roomId'), playersNicknames)
            socket.on('players-ready-to-play', (players:Array<Player>)=>{
                setPlayers(players)
            })
        })
    }, [socket])

    return(
        <div className={playerCss.con}>
            {players ? (
                <div className={AppStyle.con}>
                    {players.map((player, index)=>(
                        <div key={index} className={ 
                            player.nickname === window.localStorage.getItem('nickname') 
                            ? playerCardCss.bgForClient : playerCardCss.bg}>
                            <h1 className={playerCss.nickname}>{player.nickname}</h1>
                            <div className={playerCardCss.animals}>
                                <img src={require('../assets/rabbit.png')} alt="animal"  className={playerCardCss.image}/>
                                <p className={AppStyle.footerText}>{player.rabbits}</p>
                            </div>
                            <div className={playerCardCss.animals}>
                                <img src={require('../assets/sheep.png')} alt="animal"  className={playerCardCss.image}/>
                                <p className={AppStyle.footerText}>{player.sheeps}</p>
                            </div>
                            <div className={playerCardCss.animals}>
                                <img src={require('../assets/pig.png')} alt="animal"  className={playerCardCss.image}/>
                                <p className={AppStyle.footerText}>{player.pigs}</p>
                            </div>
                            <div className={playerCardCss.animals}>
                                <img src={require('../assets/cow.png')} alt="animal"  className={playerCardCss.image}/>
                                <p className={AppStyle.footerText}>{player.cows}</p>
                            </div>
                            <div className={playerCardCss.animals}>
                                <img src={require('../assets/horse.png')} alt="animal"  className={playerCardCss.image}/>
                                <p className={AppStyle.footerText}>{player.horses}</p>
                            </div>
                            <div className={player.smallDog ? playerCardCss.animals : playerCardCss.notActive}>
                                <img src={require('../assets/smallDog.png')} alt="animal"  className={playerCardCss.image}/>
                            </div>
                            <div className={player.smallDog ? playerCardCss.animals : playerCardCss.notActive}>
                                <img src={require('../assets/bigDog.png')} alt="animal"  className={playerCardCss.image}/>
                            </div>
                        </div>
                    ))}
                </div>
            ):null}
        </div>
    )
}

export default PlayersInGame