let
    calcContent=    require('./user/calcContent'),
    url=            require('url'),
    register=       require('./register')
module.exports=env=>{
    {
        let p=url.parse(env.request.url).pathname
        if(p=='/user'||p=='/u')
            return register(env)
    }
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method=='GET')
        return get(env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
async function get(env){
    env.headers['content-type']='text/html;charset=utf-8'
    let userId
    try{
        userId=await(calcUserId(env))
    }catch(e){
        if(e=='userNotFound')
            return 400
        throw e
    }
    return{
        status:200,
        headers:env.headers,
        content:await calcContent(env,userId),
    }
}
async function calcUserId(env){
    let username=url.parse(env.request.url).pathname.split('/')[2]
    if(username!=undefined)
        try{
            return await env.database.getUserIdByUsername(username)
        }catch(e){
            if(e.errno==1)
                throw 'userNotFound'
            throw e
        }
}
