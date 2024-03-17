import User from './createUser'

class UserActions extends User{
    public id: number
    public rabbits: number
    public sheeps: number
    public pigs: number
    public cows: number
    public horses: number
    public smallDog: boolean
    public bigDog: boolean
    public rollDiceActive: boolean
    public passActive: boolean
    public exchangeActive: boolean

    public constructor(id:number, nickname:string, rabbits:number, sheeps:number,  pigs: number,
        cows: number, horses: number, smallDog: boolean, bigDog: boolean,
        rollDiceActive: boolean, passActive: boolean, exchangeActive:boolean){
            super(nickname, false)
            this.id = id
            this.rabbits = rabbits
            this.sheeps = sheeps
            this.pigs = pigs
            this.cows = cows
            this.horses = horses
            this.smallDog = smallDog
            this.bigDog = bigDog
            this.rollDiceActive = rollDiceActive
            this.passActive = passActive
            this.exchangeActive = exchangeActive
        }

    public setRabbits(rabbits:number){
        this.rabbits += rabbits
    }

    public setSheeps(sheeps:number){
        this.sheeps += sheeps
    }

    public setPigs(pigs:number){
        this.pigs += pigs
    }

    public setCows(cows:number){
        this.cows += cows
    }

    public setHorses(horses:number){
        this.horses += horses
    }

    public setSmallDog(smallDog:boolean){
        this.smallDog = smallDog
    }

    public setBigDog(bigDog:boolean){
        this.bigDog = bigDog
    }

    public exchangeRabbitsToSheeps(){
        this.rabbits -= 6
        this.sheeps += 1
    }

    public exchangeSheepsToPigs(){
        this.sheeps -= 2
        this.pigs += 1
    }

    public exchangePigsToCows(){
        this.pigs -= 3
        this.cows += 1
    }

    public exchangeCowsToHorses(){
        this.cows -= 2
        this.horses += 1
    }

    public exchangeSheepsToSmallDog(){
        this.sheeps -= 1
        this.smallDog = true
    }

    public exchangeCowsToBigDog(){
        this.cows -= 1
        this.bigDog = true
    }

    public setExchangeActive(isActive:boolean){
        this.exchangeActive = isActive
    }

    public checkFox(){
        if(this.smallDog){
            this.setSmallDog(false)
        }else{
            this.rabbits = 1
        }
    }

    public checkWolf(){
        if(this.bigDog){
            this.setBigDog(false)
        }else{
            this.sheeps = 0
            this.pigs = 0
            this.cows= 0
            this.horses = 0
        }
    }
}

export default UserActions