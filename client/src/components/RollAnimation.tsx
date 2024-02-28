import React, { useState, useEffect } from "react"
import socket from "../socket"
import RollAnimationCss from '../componentsCSS/rollAnimation.module.css'

const RollAnimation = () => {
    const [rollRes, setRollRes] = useState<string[]>([])
    const [startAnimation, setStartAnimation] = useState(false)
    const [animalsImage, setAnimalsImage] = useState<string[]>([])
    const animalsImages = ['rabbit', 'sheep', 'pig', 'cow', 'horse', 'fox', 'wolf', 'smallDog', 'bigDog']

    const setAnimals = (animals: Array<string>) =>{
        const animalArray: string[] = animals
        .map(animal => animalsImages.filter(image => image === animal))
        .flat()
        .filter(Boolean)
        setAnimalsImage(animalArray)
        setStartAnimation(true)
    }
    
    useEffect(()=>{
        socket.on('roll-res-to-all-players', (rollRes:Array<string>)=>{
            setRollRes(rollRes)
        })
        if(rollRes.length>0){
            setAnimals(rollRes)
        }
        
        return () => {
            socket.off('roll-res-to-all-players')
        }
    }, [socket, rollRes])

    return (
        <div>
             <div className={RollAnimationCss.con}>
                <div className={RollAnimationCss.box}>
                    {startAnimation ? (
                        <div>
                            <img src={require(`../assets/${animalsImage[0]}.png`)} alt="animal" className={RollAnimationCss.image}/>
                            <img src={require(`../assets/${animalsImage[1]}.png`)} alt="animal" className={RollAnimationCss.image}/>
                        </div>
                    ):null}   
                </div>
            </div>
        </div>
    )
}

export default RollAnimation