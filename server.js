let
    user=       require('./server/user'),
    edituser=   require('./server/edituser')
module.exports=althea=>{
    althea.addPagemodule('/edituser',edituser)
    althea.addPagemodule(env=>{
        let p=env.analyze.request.parsedUrl.pathname.split('/')[1]
        return p=='user'||p=='u'
    },user)
}
