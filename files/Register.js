import{EventEmmiter}from 'https://gitcdn.link/cdn/anliting/simple.js/3b5e122ded93bb9a5a7d5099ac645f1e1614a89b/src/simple.static.js'
import{doe}from '/lib/core.static.js'
import Ui from './Register/Ui.js'
import style from './Register/style.js'
function Register(site){
    EventEmmiter.call(this)
    this._site=site
}
Object.setPrototypeOf(Register.prototype,EventEmmiter.prototype)
Register.prototype._register=async function(username,password){
    let r=await this._site.send({
        function:'newUser',
        username,
        password,
    })
    if(r!=0)
        throw Error()
    return this.emit('register',{
        username,
        password
    })
}
function ExplanationUi(){
    this.node=doe.div(n=>
        doe.button('Explain the user system.',{onclick(e){
            n.removeChild(this)
            n.innerHTML=`<div style=padding-left:32px>
<p>
Each user of this website has a username and a password:
<p>
The username is a character string, which should be longer than 0 characters, not longer than 16 characters, and only include lowercase letters and numbers.
<p>
The password is a character string, which is the secret information that you must provide it to prove your identity everytime you login. For security reasons, it is recommended but not limited to
<ul>
<li>set a long and random-generated password,
<li>remember it carefully, and
<li>tell it to nobody.
</ul>
</div>
`
        }})
    )
}
Object.defineProperty(Register.prototype,'explanationUi',{get(){
    return(new ExplanationUi).node
}})
Object.defineProperty(Register.prototype,'ui',{get(){
    if(this._ui)
        return this._ui
    let ui=new Ui(this._site)
    ui.register=(u,p)=>this._register(u,p)
    return this._ui=ui
}})
Register.style=doe.style(style)
export default Register
