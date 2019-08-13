async function get(env){
    let user=await env.database.getCurrentUserByRequest(env.request)
    if(!user.id)
        return 403
    let ua=env.library.userAgent
    if(!ua.leOr(
        ua.version.esModuleBase,
        ua.parse(env.request.headers['user-agent'])
    ))
        return ua.notSupport(ua.version.esModuleBase)
    env.headers['content-type']='text/html;charset=utf-8'
    return{
        status:200,
        headers:env.headers,
        content:calcContent(env),
    }
}
function calcContent(env){
    return`
<!doctype html>
<title>Edit User</title>
<base href=/>
<meta name=viewport content='width=device-width,initial-scale=1'>
<body>
${env.althea.loadModule(
    'plugins/user/edituser.static.js',
)}
    `
}
export default env=>{
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method==='GET')
        return get(env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
