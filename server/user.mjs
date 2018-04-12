import calcContent from './user/calcContent'
import register from './register'
async function calcUserId(env){
    let username=env.analyze.request.parsedUrl.pathname.split('/')[2]
    if(username!=undefined)
        try{
            return await env.database.getUserIdByUsername(username)
        }catch(e){
            if(e.errno==1)
                throw'userNotFound'
            throw e
        }
}
async function userPage(env,userId){
    if(env.request.method!='GET'){
        env.headers.allow='GET'
        return{
            status:405,
            headers:env.headers,
        }
    }
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:await calcContent(env,userId),
    }
}
async function userPermissionPage(env,userId){
    if(env.request.method!='GET'){
        env.headers.allow='GET'
        return{
            status:405,
            headers:env.headers,
        }
    }
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:`
            <!doctype html>
            <title>Permission</title>
            <script type=module src=/plugins/user/permission.js></script>
        `,
    }
}
export default async env=>{
    {
        let p=env.analyze.request.parsedUrl.pathname
        if(p=='/user'||p=='/u')
            return register(env)
    }
    let userId
    try{
        userId=await calcUserId(env)
    }catch(e){
        if(e=='userNotFound')
            return 400
        throw e
    }
    let splitted=env.analyze.request.parsedUrl.pathname.split('/')
    if(splitted.length==3)
        return userPage(env,userId)
    else if(splitted.length==4&&splitted[3]=='permission')
        return userPermissionPage(env,userId)
    return 404
}
