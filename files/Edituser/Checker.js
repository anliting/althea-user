function Checker(edituser,currentUser){
    this._edituser=edituser
    this._currentUser=currentUser
}
Checker.prototype.isAvailableUsername=function(s){
    if(s==this._currentUser.username)
        return Promise.resolve(true)
    return this._edituser._site.then(site=>
        site.send({
            function:'getUserByUsername',
            username:s,
        })
    ).then(id=>id==undefined)
}
Checker.prototype.isValidUsername=function(s){
    return /^[0-9a-z]{1,16}$/.test(s)
}
Checker.prototype.isValidNickname=function(s){
    return /^.{0,16}$/.test(s)
}
Checker
