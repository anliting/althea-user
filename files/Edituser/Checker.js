function Checker(edituser,currentUser){
    this._edituser=edituser
    this._currentUser=currentUser
}
Checker.prototype.isAvailableUsername=async function(s){
    if(s==this._currentUser.username)
        return true
    this._edituser._site=await this._edituser._site
    let id=await this._edituser._site.send({
        function:'getUserByUsername',
        username:s,
    })
    return id==undefined
}
Checker.prototype.isValidUsername=function(s){
    return /^[0-9a-z]{1,16}$/.test(s)
}
Checker.prototype.isValidNickname=function(s){
    return /^.{0,16}$/.test(s)
}
Checker
