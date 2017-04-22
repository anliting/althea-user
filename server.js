let
    user=       require('./server/user'),
    edituser=   require('./server/edituser'),
    register=   require('./server/register')
module.exports=althea=>{
    althea.addPagemodule('/edituser',edituser)
    althea.addPagemodule('/user',user)
    althea.addPagemodule('u',user)
}
