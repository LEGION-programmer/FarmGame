import User from './createUser'

class UserActions extends User{
    public id: number
    public hisTour:boolean
    public rabbits: number
    public sheeps: number
    public pigs: number
    public cows: number
    public horses: number
    public smallDog: boolean
    public bigDog: boolean

    public constructor(id:number, nickname:string, hisTour:boolean, rabbits:number, sheeps:number,  pigs: number,
        cows: number, horses: number, smallDog: boolean, bigDog: boolean){
            super(nickname, false)
            this.id = id
            this.hisTour = hisTour
            this.rabbits = rabbits
            this.sheeps = sheeps
            this.pigs = pigs
            this.cows = cows
            this.horses = horses
            this.smallDog = smallDog
            this.bigDog = bigDog
        }

    public setHisTour(hisTour:boolean){
        this.hisTour = hisTour
    }

    public setRabbits(rabbits:number){
        this.rabbits = rabbits
    }

    public setSheeps(sheeps:number){
        this.sheeps = sheeps
    }

    public setPigs(pigs:number){
        this.pigs = pigs
    }

    public setCows(cows:number){
        this.cows = cows
    }

    public setHorses(horses:number){
        this.horses = horses
    }

    public setSmallDog(smallDog:boolean){
        this.smallDog = smallDog
    }

    public setBigDog(bigDog:boolean){
        this.bigDog = bigDog
    }
}

export default UserActions