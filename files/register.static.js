import { Site, dom } from '/lib/core.static.js';
import { EventEmmiter } from 'https://gitcdn.link/cdn/anliting/simple.js/3b5e122ded93bb9a5a7d5099ac645f1e1614a89b/src/simple.static.js';

var style = `div.main{
    margin:0 auto;
    width:600px;
    max-width:100%;
}
div.main>p{
    text-align:justify;
}
@media(max-width:480px){
    div.register div.block{
        margin:48px 0;
    }
}
@media(min-width:480px){
    div.register div.block{
        display:table-row;
    }
    div.register div.formFirst{
        display:table-cell;
        padding-right:8px;
    }
    div.register div.formSecond{
        display:table-cell;
        padding-left:8px;
    }
}
`;

function createNode(){
    return dom.div({className:'register'},
        dom.div({className:'block'},
            dom.div({className:'formFirst'},
                dom.p(
                    'Username: ',
                    this._input_username=dom.input()
                )
            ),
            dom.div({className:'formSecond'},
                this._span_status_username_validity=dom.span(),
                dom.br(),
                this._span_status_username_availability=dom.span()
            )
        ),
        dom.div({className:'block'},
            dom.div({className:'formFirst'},
                dom.p(
                    'Password: ',
                    this._input_password=dom.input({type:'password'})
                )
            ),
            dom.div({className:'formSecond'})
        ),
        dom.div({className:'block'},
            dom.div({className:'formFirst'},
                dom.p(
                    'Confirm password: ',
                    this._input_confirmpassword=
                        dom.input({type:'password'})
                )
            ),
            dom.div({className:'formSecond'},
                this._span_status_confirmpassword=dom.span()
            )
        ),
        this._submitButton=dom.button('Submit')
    )
}

function Ui(site){
    this.node=createNode.call(this);
    let
        isavailable_usernames=[],
        input_username=this._input_username,
        input_password=this._input_password,
        input_confirmpassword=this._input_confirmpassword,
        span_status_username_validity=
            this._span_status_username_validity,
        span_status_username_availability=
            this._span_status_username_availability,
        span_status_confirmpassword=
            this._span_status_confirmpassword,
        submitButton=this._submitButton;
    input_username.addEventListener('input',e=>{
        isvalid_username()
            &&isavailable_username(e);
    });
    input_password.addEventListener('input',()=>{
        isvalid_confirmpassword();
    });
    input_confirmpassword.addEventListener('input',()=>{
        isvalid_confirmpassword();
    });
    submitButton.onclick=e=>{
        e.preventDefault();
        if(!(
            isvalid_username()&&
            isavailable_username(e)&&
            isvalid_confirmpassword()
        ))
            return
        let
            username=input_username.value,
            password=input_password.value;
        this.register(
            input_username.value,
            input_password.value
        ).catch(()=>{
            isavailable_usernames[input_username.value]=undefined;
            isavailable_username();
        });
    };
    function isvalid_username(){
        let
            isvalid=input_username.value.match(/^[0-9a-z]{1,16}$/);
        span_status_username_validity.innerHTML=
            input_username.value.length+' characters, '+(isvalid
            ?'<span style=color:green>valid</span>.'
            :'<span style=color:red>invalid</span>.');
        return isvalid
    }
    function isavailable_username(e){
        if(isavailable_usernames[input_username.value]===undefined){
            {
                let username=input_username.value;(async()=>{
                    let
                        id=await site.send({
                            function:'getUserByUsername',
                            username,
                        });
                    isavailable_usernames[username]=id==undefined;
                    isavailable_username(e);
                })();
            }
            span_status_username_availability.innerHTML=
                '<span style=color:blue>checking...</span>';
            if(e)
                e.preventDefault();
            return
        }
        span_status_username_availability.innerHTML=
            isavailable_usernames[input_username.value]
            ?'<span style=color:green>This username has not been used.</span>'
            :'<span style=color:red>This username has been used.</span>';
        return isavailable_usernames[input_username.value]
    }
    function isvalid_confirmpassword(){
        let
            isvalid=input_password.value===input_confirmpassword.value;
        span_status_confirmpassword.innerHTML=isvalid?
            '<span style=color:green>valid</span>.'
        :
            '<span style=color:red>invalid</span>.';
        return isvalid
    }
}

var style$1 = `div.register input{
    width:160px;
}
`;

function Register(site){
    EventEmmiter.call(this);
    this._site=site;
}
Object.setPrototypeOf(Register.prototype,EventEmmiter.prototype);
Register.prototype._register=async function(username,password){
    let r=await this._site.send({
        function:'newUser',
        username,
        password,
    });
    if(r!=0)
        throw Error()
    return this.emit('register',{
        username,
        password
    })
};
function ExplanationUi(){
    this.node=dom.div(n=>
        dom.button('Explain the user system.',{onclick(e){
            n.removeChild(this);
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
`;
        }})
    );
}
Object.defineProperty(Register.prototype,'explanationUi',{get(){
    return(new ExplanationUi).node
}});
Object.defineProperty(Register.prototype,'ui',{get(){
    if(this._ui)
        return this._ui
    let ui=new Ui(this._site);
    ui.register=(u,p)=>this._register(u,p);
    return this._ui=ui
}});
Register.style=dom.style(style$1);

let site=new Site;
let register=new Register(site);
register.on('register',async e=>{
    await site.login(e.username,e.password);
    location='';
});
dom.head(
    dom.style(style),
    Register.style
);
dom.body(
    dom.div({className:'main'},
        dom.h1('Register'),
        dom.p(`This web page explains the user system of this
            website and provides a interface for registering.
        `),
        register.explanationUi,
        dom.p(`The registering process starts here. Just input the
            username and password, and then submit.
        `),
        register.ui.node
    )
);
