import user from './server/user'
import edituser from './server/edituser'
export default althea=>{
    althea.addPagemodule('/edituser',edituser)
    althea.addPagemodule(env=>{
        let p=env.analyze.request.parsedUrl.pathname.split('/')[1]
        return p=='user'||p=='u'
    },user)
}
