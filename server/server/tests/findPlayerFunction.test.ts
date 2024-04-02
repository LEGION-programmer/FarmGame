import { findPlayer } from "../actions/operations"
import UserActions from "../actions/userActions"
const player1 = new UserActions(1, "Player1", 0, 0, 0, 0, 0, false, false, false, false, false)


const playersInGame: Map<string, Array<UserActions>> = new Map()
playersInGame.set("1234", [player1])

describe('findPlayer', ()=>{
    it('findUser function return correct user', ()=>{
        const player = findPlayer('1234', 1)
        expect(typeof player).toBe('object')
    })
    it('findUser function return null becose of bad room id', ()=>{
        const player = findPlayer('12534', 1)
        expect(player).toBe(null)
    })
    it('findUser function return null becose of bad player id', ()=>{
        const player = findPlayer('1234', 2)
        expect(player).toBe(null)
    })
})