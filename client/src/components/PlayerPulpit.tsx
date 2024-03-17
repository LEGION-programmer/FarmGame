import React from "react"
import AppCss from '../App.module.css'
import PlayerCss from '../componentsCSS/player.module.css'
import PlayerAnimals from "./PlayerAnimals"
import AnimalExchange from "./AnimalExchange"
import PlayerActions from "./PlayerActions"

const PlayerPulpit = () => {
    return(
        <div className={AppCss.con}>
            <div className={PlayerCss.playerPulpit}>
                <div className={PlayerCss.playerSection}>
                    <PlayerAnimals />
                </div>
                <hr className={PlayerCss.hr} />
                <div className={PlayerCss.playerSection}>
                    <AnimalExchange />
                </div>
                <hr className={PlayerCss.hr} />
                <div className={PlayerCss.playerSection}>
                    <PlayerActions />
                </div>
            </div>
        </div>
    )
}

export default PlayerPulpit