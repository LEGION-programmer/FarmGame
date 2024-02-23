import React from "react"
import PlayersInGame from "../components/PlayersInGame"
import PlayerPulpit from "../components/PlayerPulpit"

const GamePage = () => {
    return (
        <div>
            <div>
                <PlayersInGame />
            </div>
            <div>
                <PlayerPulpit />
            </div>
        </div>
    )
}

export default GamePage