import UserActions from "../actions/userActions"

describe('User actions', ()=>{
    const user:UserActions = new UserActions(5, 'Player', 1, 0, 0 , 0, 0, false, false, false, false, false)

    it('User have some id', ()=>{
        expect(user.id).toBe(5)
    })
    it('User have a nikckname', ()=>{
        expect(user.nickname).toBe('Player')
    })
    it('User have one rabbit on start', ()=>{
        expect(user.rabbits).toBe(1)
    })
    it('setRabbits method works fine', ()=>{
        user.setRabbits(10)
        expect(user.rabbits).toBe(11)
    })
    it('setSheeps method works fine', ()=>{
        user.setSheeps(20)
        expect(user.sheeps).toBe(20)
    })
    it('setPigs method works fine', ()=>{
        user.setPigs(20)
        expect(user.pigs).toBe(20)
    })
    it('setCows method works fine', ()=>{
        user.setCows(20)
        expect(user.cows).toBe(20)
    })
    it('setHorses method works fine', ()=>{
        user.setHorses(20)
        expect(user.horses).toBe(20)
    })
    it('setSmallDog method works fine', ()=>{
        user.setSmallDog(true)
        expect(user.smallDog).toBeTruthy()
    })
    it('setBigDog method works fine', ()=>{
        user.setBigDog(true)
        expect(user.bigDog).toBeTruthy()
    })
    it('exchangeRabbitsToSheeps works fine', ()=>{
        user.exchangeRabbitsToSheeps()
        expect(user.rabbits).toBe(5)
        expect(user.sheeps).toBe(21)
    })
    it('exchangeSheepsToPigs works fine', ()=>{
        user.exchangeSheepsToPigs()
        expect(user.sheeps).toBe(19)
        expect(user.pigs).toBe(21)
    })
    it('exchangePigsToCows works fine', ()=>{
        user.exchangePigsToCows()
        expect(user.pigs).toBe(18)
        expect(user.cows).toBe(21)
    })
    it('exchangeCowsToHorses works fine', ()=>{
        user.exchangeCowsToHorses()
        expect(user.cows).toBe(19)
        expect(user.horses).toBe(21)
    })
    it('exchangeSheepsToSmallDog works fine', ()=>{
        user.exchangeSheepsToSmallDog()
        expect(user.sheeps).toBe(18)
        expect(user.smallDog).toBeTruthy()
    })
    it('exchangeCowsToBigDog works fine', ()=>{
        user.exchangeCowsToBigDog()
        expect(user.cows).toBe(18)
        expect(user.bigDog).toBeTruthy()
    })
    it('exchangeCowsToBigDog works fine', ()=>{
        user.setExchangeActive(true)
        expect(user.exchangeActive).toBeTruthy()
    })
    it('checkFox when player have smallDog', ()=>{
        user.checkFox()
        expect(user.smallDog).toBeFalsy()
    })
    it('checkFox when player have not smallDog', ()=>{
        user.checkFox()
        expect(user.rabbits).toBe(1)
    })
    it('checkWolf when player have smallDog', ()=>{
        user.checkWolf()
        expect(user.bigDog).toBeFalsy()
    })
    it('checkWolf when player have not smallDog', ()=>{
        user.checkWolf()
        expect(user.sheeps).toBe(0)
        expect(user.pigs).toBe(0)
        expect(user.cows).toBe(0)
        expect(user.horses).toBe(0)
    })
})