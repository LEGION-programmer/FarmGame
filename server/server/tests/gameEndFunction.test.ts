import { gameEnd } from "../actions/operations"
import UserActions from "../actions/userActions"

describe('gameEnd', ()=>{
    it('Player have not all animals return false', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 1, 0, 3, 3, 2, false, false, false, false, false)
        expect(gameEnd(player)).toBeFalsy()
    })
    it('Player have all animals return true', ()=>{
        const player:UserActions = new UserActions(1, 'Player1', 1, 1, 3, 3, 2, false, false, false, false, false)
        expect(gameEnd(player)).toBeTruthy()
    })
})