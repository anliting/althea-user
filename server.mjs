import user from './server/user.mjs'
import edituser from './server/edituser.mjs'
export default althea=>{
    althea.addPagemodule('/edituser',edituser)
    althea.addPagemodule(env=>{
        let p=env.analyze.request.parsedUrl.pathname.split('/')[1]
        return p=='user'||p=='u'
    },user)
}
