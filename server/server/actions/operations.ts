import UserActions from "./userActions"

export const rooms: Array<string> = new Array()
export const players: Map<string, Array<object>> = new Map()
export const playersInGame: Map<string, Array<UserActions>> = new Map()

export const findPlayer = (roomId: string, playerId:number):UserActions|null => {
    const playersArray = playersInGame.get(roomId)
    const player= playersArray?.find(el => el.id === playerId)
    return player || null
}

export const addAnimals = (player:UserActions, firstAnimal:string, secondAnimal:string) => {
    let animal
    if(firstAnimal === secondAnimal){
        switch (firstAnimal){
            case 'rabbit':
                animal = player.rabbits+2
                animal = Math.floor(animal/2)
                player.setRabbits(animal)
                break
            case 'sheep':
                animal = player.sheeps+2
                animal = Math.floor(animal/2)
                player.setSheeps(animal)
                break
            case 'pig':
                animal = player.sheeps+2
                animal = Math.floor(animal/2)
                player.setPigs(animal)
                break
        }
    }else{
        switch (firstAnimal){
            case 'rabbit':
                animal = player.rabbits+1
                animal = Math.floor(animal/2)
                player.setRabbits(animal)
                break
            case 'sheep':
                animal = player.sheeps+1
                animal = Math.floor(animal/2)
                player.setSheeps(animal)
                break
            case 'pig':
                animal = player.pigs+1
                animal = Math.floor(animal/2)
                player.setPigs(animal)
                break
            case 'cow':
                animal = player.cows+1
                animal = Math.floor(animal/2)
                player.setCows(animal)
                break
            case 'wolf':
                if(player.bigDog){
                    player.setBigDog(false)
                }else{
                    player.setSheeps(0)
                    player.setPigs(0)
                    player.setCows(0)
                    player.setHorses(0)
                }
                break
        }
        switch (secondAnimal){
            case 'rabbit':
                animal = player.rabbits+1
                animal = Math.floor(animal/2)
                player.setRabbits(animal)
                break
            case 'sheep':
                animal = player.sheeps+1
                animal = Math.floor(animal/2)
                player.setSheeps(animal)
                break
            case 'pig':
                animal = player.pigs+1
                animal = Math.floor(animal/2)
                player.setPigs(animal)
                break
            case 'horse':
                animal = player.horses+1
                animal = Math.floor(animal/2)
                player.setHorses(animal)
                break
            case 'fox':
                if(player.smallDog){
                    player.setSmallDog(false)
                }else{
                    player.setRabbits(1)
                }
        }
    }
}

export const changeTour = (roomId:string, playerId:number) => {
    const playersArrayFromRoom = playersInGame.get(roomId)
    if(playersArrayFromRoom){
        if(playerId == playersArrayFromRoom.length-1){
            playersArrayFromRoom[playerId].hisTour = false
            playersArrayFromRoom[0].hisTour = true
        }else{
            playersArrayFromRoom[playerId].hisTour = false
            playersArrayFromRoom[playerId + 1].hisTour = true
        }
    }
    return playersArrayFromRoom
}

export const exchangeAnimals = (option:number, player:UserActions) => {
    switch (option){
        case 1:
            player.exchangeRabbitsToSheeps()
            break
        case 2:
            player.exchangeSheepsToPigs()
            break
        case 3:
            player.exchangePigsToCows()
            break
        case 4:
            player.exchangeCowsToHorses()
            break
        case 5:
            player.exchangeSheepsToSmallDog()
            break
        case 6:
            player.exchangeCowsToBigDog()
            break
    }
}