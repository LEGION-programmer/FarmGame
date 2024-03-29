import User from '../actions/createUser'

describe('Create user', ()=>{
    const user:User = new User('Player', false)

    it('User include nickname', ()=>{
        expect(user.nickname).toBe('Player')
    })
    it('User include isOwner', ()=>{
        expect(user.isOwner).toBeFalsy()
    })
    it('User nickname is type string', ()=>{
        expect(typeof user.nickname).toBe('string')
    })

})