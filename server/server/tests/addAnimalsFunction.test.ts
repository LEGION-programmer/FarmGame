import { addAnimals } from "../actions/operations"
import UserActions from "../actions/userActions"


describe('addAnimals', ()=>{
    // testing when result are the same
    it('Add two rabbits', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'rabbit', 'rabbit')
        expect(player.rabbits).toBe(2)
    })
    it('Add two sheeps', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'sheep', 'sheep')
        expect(player.sheeps).toBe(1)
    })
    it('Add two pigs', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'pig', 'pig')
        expect(player.pigs).toBe(1)
    })
    //  testing first die
    it('On first die was rabbit', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'rabbit', 'sheep')
        expect(player.rabbits).toBe(2)
    })
    it('On first die was sheep but before player has 0', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'sheep', 'rabbit')
        expect(player.sheeps).toBe(0)
    })
    it('On first die was pig but before player has 0', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'pig', 'rabbit')
        expect(player.pigs).toBe(0)
    })    
    it('On first die was cow but before player has 0', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'pig', 'rabbit')
        expect(player.cows).toBe(0)
    })
    it('On first die was sheep and player before have one', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 0, 1, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'sheep', 'rabbit')
        expect(player.sheeps).toBe(2)
    })
    it('On first die was pig and player before have one', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 0, 0, 1, 0, 0, false, false, false, false, false)
        addAnimals(player, 'pig', 'rabbit')
        expect(player.pigs).toBe(2)
    })
    it('On first die was cow and player before have one', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 0, 0, 0, 1, 0, false, false, false, false, false)
        addAnimals(player, 'cow', 'rabbit')
        expect(player.cows).toBe(2)
    })
    it('On first die was wolf and player have not big dog', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 0, 1, 1, 1, 1, false, false, false, false, false)
        addAnimals(player, 'wolf', 'rabbit')
        expect(player.sheeps).toBe(0)
        expect(player.pigs).toBe(0)
        expect(player.cows).toBe(0)
        expect(player.horses).toBe(0)
    })
    it('On first die was wolf and player have big dog', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 0, 1, 1, 1, 1, false, true, false, false, false)
        addAnimals(player, 'wolf', 'rabbit')
        expect(player.sheeps).toBe(1)
        expect(player.pigs).toBe(1)
        expect(player.cows).toBe(1)
        expect(player.horses).toBe(1)
        expect(player.bigDog).toBeFalsy()
    })
    //  testing second die
    it('On second die was rabbit', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'sheep', 'rabbit')
        expect(player.rabbits).toBe(2)
    })
    it('On second die was sheep but before player has 0', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'rabbit', 'sheep')
        expect(player.sheeps).toBe(0)
    })
    it('On second die was pig but before player has 0', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'rabbit', 'pig')
        expect(player.pigs).toBe(0)
    })    
    it('On second die was horse but before player has 0', ()=>{
        const player:UserActions = new UserActions(1, "Player1", 1, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'pig', 'horse')
        expect(player.horses).toBe(0)
    })
    it('On second die was sheep and player before have one', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 0, 1, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'rabbit', 'sheep')
        expect(player.sheeps).toBe(2)
    })
    it('On second die was pig and player before have one', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 0, 0, 1, 0, 0, false, false, false, false, false)
        addAnimals(player, 'rabbit', 'pig')
        expect(player.pigs).toBe(2)
    })
    it('On second die was horse and player before have one', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 0, 0, 0, 0, 1, false, false, false, false, false)
        addAnimals(player, 'rabbit', 'horse')
        expect(player.horses).toBe(2)
    })
    it('On second die was fox and player have not samll dog', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 22, 0, 0, 0, 0, false, false, false, false, false)
        addAnimals(player, 'pig', 'fox')
        expect(player.rabbits).toBe(1)
    })
    it('On second die was fox and player have small dog', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 22, 0, 0, 0, 0, true, false, false, false, false)
        addAnimals(player, 'pig', 'fox')
        expect(player.rabbits).toBe(22)
        expect(player.smallDog).toBeFalsy()
    })
    it('Player get fox and wolf without small dog and big dog', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 22, 32, 32, 32, 32, false, false, false, false, false)
        addAnimals(player, 'wolf', 'fox')
        expect(player.rabbits).toBe(1)
        expect(player.sheeps).toBe(0)
        expect(player.pigs).toBe(0)
        expect(player.cows).toBe(0)
        expect(player.horses).toBe(0)
    })
    it('Player get fox and wolf and have small dog and big dog', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 22, 32, 32, 32, 32, true, true, false, false, false)
        addAnimals(player, 'wolf', 'fox')
        expect(player.rabbits).toBe(22)
        expect(player.sheeps).toBe(32)
        expect(player.pigs).toBe(32)
        expect(player.cows).toBe(32)
        expect(player.horses).toBe(32)
        expect(player.smallDog).toBeFalsy()
        expect(player.bigDog).toBeFalsy()
    })
})