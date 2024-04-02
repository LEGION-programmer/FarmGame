import { exchangeAnimals } from "../actions/operations"
import UserActions from "../actions/userActions"

describe('exchangeAnimals', ()=>{
    it('Player exchange 6 rabbits to 1 sheep', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 7, 0, 0, 0, 0, false, false, false, false, false)
        exchangeAnimals(1, player)
        expect(player.rabbits).toBe(1)
        expect(player.sheeps).toBe(1)
    })
    it('Player exchange 2 sheeps to 1 pig', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 1, 3, 0, 0, 0, false, false, false, false, false)
        exchangeAnimals(2, player)
        expect(player.sheeps).toBe(1)
        expect(player.pigs).toBe(1)
    })
    it('Player exchange 3 pigs to 1 cow', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 1, 1, 4, 0, 0, false, false, false, false, false)
        exchangeAnimals(3, player)
        expect(player.pigs).toBe(1)
        expect(player.cows).toBe(1)
    })
    it('Player exchange 2 cows to 1 horse', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 1, 1, 1, 3, 0, false, false, false, false, false)
        exchangeAnimals(4, player)
        expect(player.cows).toBe(1)
        expect(player.horses).toBe(1)
    })
    it('Player exchange 1 sheep to samll dog', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 1, 1, 1, 0, 0, false, false, false, false, false)
        exchangeAnimals(5, player)
        expect(player.sheeps).toBe(0)
        expect(player.smallDog).toBeTruthy()
    })
    it('Player exchange 1 cow to big dog', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 1, 1, 1, 1, 0, false, false, false, false, false)
        exchangeAnimals(6, player)
        expect(player.cows).toBe(0)
        expect(player.bigDog).toBeTruthy()
    })
})