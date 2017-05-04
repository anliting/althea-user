module.exports=env=>{
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
async function get(env){
    let user=await env.database.getCurrentUserByRequest(env.request)
    if(!user.id)
        return 403
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
<div id=div_main>
<h1>Edit User</h1>
<form id=form>
<table>
<tr>
    <td>Username<br>
        <input id=input_username disabled>
    <td>
        This field is required. 
        Your username should be longer than 0 characters, 
        not longer than 16 characters, and only include 
        lowercase letters and numbers.<br>
        <span id=span_status_username_validity></span><br>
        <span id=span_status_username_availability></span>
<tr>
    <td>Nickname<br>
        <input id=input_nickname disabled>
    <td>
        This field is optional, leave it blank if you do not want to provide it. 
        Your nickname should be longer than 0 characters, 
        shorter than 16 characters.<br>
        <span id=span_status_nickname_validity></span>
<tr>
    <td colspan=2>
        <input id=input_ischangepassword type=checkbox>
        Change password
    <td>
<tr id=tr_password>
    <td>Password<br>
        <input id=input_password type=password>
    <td>
<tr id=tr_confirmpassword>
    <td>Confirm password<br>
        <input id=input_confirmpassword type=password>
    <td>
        <span id=span_status_confirmpassword></span>
<tr>
    <td><input id=input_submit type=submit
        value=Submit disabled><br>
    <td>
</table>
</form>
</div>
${env.althea.loadModule(env.envVars,'plugins/althea-user/edituser.js')}
    `
}
