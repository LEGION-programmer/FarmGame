import React from "react"
import AppCss from '../App.module.css'

const GameRules = () => {
    return (
        <div className={AppCss.con}>
            <div className={AppCss.rulesBg}>
                <h1 className={AppCss.headerText}>About the game</h1>
                <p className={AppCss.footerText}>Each player takes turns rolling two 
                dice, each dice has different animals on it that the player must 
                collect. The winner is the first to collect at least one type of each animal 
                (small dog and large dog are support animals and are not 
                required to complete the game) In addition to the animals on the dice, 
                the player has access to a store where he can exchange individual 
                animals for others. The player first rolls the dice and then can make 
                one exchange per round</p>
                <h1 className={AppCss.headerText}>What animals appear on dice?</h1>
                <p className={AppCss.footerText}>The first die contains:</p>
                <ul className={AppCss.listInRules}>
                    <li>6 rabbits</li>
                    <li>3 sheep</li>
                    <li>1 pig</li>
                    <li>1 cow</li>
                    <li>1 wolf (special animal)</li>
                </ul>      
                <p className={AppCss.footerText}>The second die contains:</p>
                <ul className={AppCss.listInRules}> 
                    <li>6 rabbits</li>
                    <li>3 sheep</li>
                    <li>1 pig</li>
                    <li>1 horse</li>
                    <li>1 fox (special animal)</li> 
                </ul>  
                <h1 className={AppCss.headerText}>How do special animals work?</h1> 
                <p className={AppCss.footerText}>When a player draws a fox, he loses all but one of the rabbits</p>
                <p className={AppCss.footerText}>When a player draws a wolf, he loses all large animals (sheep, pigs, cows, horses)</p> 
                <p className={AppCss.footerText}>A small dog defends against a fox attack (single use, a player can only have one)</p> 
                <p className={AppCss.footerText}>A large dog defends against a wolf attack (single use, a player can only have one)</p> 
                <h1 className={AppCss.headerText}>What exchanges take place in the store?</h1>
                <p className={AppCss.footerText}>Can be exchanged in store:</p>
                <ul className={AppCss.listInRules}>
                    <li>6 rabbits on 1 sheep</li>
                    <li>2 sheeps on 1 pig</li>
                    <li>3 pigs on 1 cow</li>
                    <li>2 cows on 1 horse</li>
                    <li>1 sheep on 1 small dog</li>
                    <li>1 cow on 1 big dog</li>
                </ul>
            </div>
        </div>
    )
}

export default GameRules