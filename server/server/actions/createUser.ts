class User{
    nickname: string
    isOwner: boolean

    public constructor(nickname:string, isOwner:boolean){
        this.nickname = nickname
        this.isOwner = isOwner
    }
}

export default User