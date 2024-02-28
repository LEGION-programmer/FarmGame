import React from "react"
import PlayersInGame from "../components/PlayersInGame"
import PlayerPulpit from "../components/PlayerPulpit"
import RollAnimation from "../components/RollAnimation"

const GamePage = () => {
    return (
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
    )
}

export default GamePage