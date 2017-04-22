let
    user=       require('./server/user'),
    edituser=   require('./server/edituser'),
    register=   require('./server/register')
module.exports=althea=>{
    althea.addPagemodule('/edituser',edituser)
    althea.addPagemodule(env=>{
        let path=env.analyze.request.parsedUrl.pathname.split('/')
        return path[1]=='u'||path[1]=='user'
    },user)
}
