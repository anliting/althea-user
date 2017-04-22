module.exports=calcContent
async function calcContent(env,userId){
    let content=`
<!doctype html>
<title>User</title>
<base href=${env.config.root}>
<meta name=viewport content='width=device-width,initial-scale=1'>
<body>
${env.althea.loadModule(env.envVars,'user.js',userId?userId:'null',1)}
`
    return content
}
