import { doe, Site, general } from '/lib/core.static.js';

function Checker(edituser,currentUser){
    this._edituser=edituser;
    this._currentUser=currentUser;
}
Checker.prototype.isAvailableUsername=async function(s){
    if(s==this._currentUser.username)
        return true
    let id=await this._edituser._site.send({
        function:'getUserByUsername',
        username:s,
    });
    return id==undefined
};
Checker.prototype.isValidUsername=function(s){
    return /^[0-9a-z]{1,16}$/.test(s)
};
Checker.prototype.isValidNickname=function(s){
    return /^.{0,16}$/.test(s)
};

var updater = {
    updateUsernameVadility(span,length,status){
        let message=[
            '<span style=color:red>invalid</span>.',
            '<span style=color:green>valid</span>.',
        ];
        span.innerHTML=`
            ${length} characters, ${message[status]}
        `;
    },
    updateUsernameAvailability(span,status){
        let message=[
            '<span style=color:blue>checking ...</span>',
            '<span style=color:red>This username cannot be used.</span>',
            '<span style=color:green>This username can be used.</span>',
        ];
        span.innerHTML=
            message[status];
    },
    updateNicknameValidity(span,length,status){
        let message=[
            '<span style=color:red>invalid</span>.',
            '<span style=color:green>valid</span>.',
        ];
        span.innerHTML=`
            ${length} characters, ${
                message[status]
            }
        `;
    },
    updatePasswordValidity(span,status){
        let message=[
            '<span style=color:red>invalid</span>.',
            '<span style=color:green>valid</span>.',
        ];
        span.innerHTML=message[status];
    }
}

function View(){
}

var view = {get(){
    function checkPasswordValidity(){
        let valid=
            view.input_password.value==view.input_confirmpassword.value;
        updater.updatePasswordValidity(
            view.span_status_confirmpassword,
            valid?1:0
        );
    }
    function usernameTr(){
        return doe.tr(
            doe.td(
                'Username',
                doe.br(),
                view.input_username=doe.input({
                    className:'username',
                    disabled:true
                })
            ),
            doe.td(
                `
                    This field is required. 
                    Your username should be longer than 0 characters, 
                    not longer than 16 characters, and only include 
                    lowercase letters and numbers.
                `,
                doe.br(),
                view.span_status_username_validity=doe.span(),
                doe.br(),
                view.span_status_username_availability=doe.span(),
            )
        )
    }
    function nicknameTr(){
        return doe.tr(
            doe.td(
                'Nickname',
                doe.br(),
                view.input_nickname=doe.input({
                    className:'nickname',
                    disabled:true
                })
            ),
            doe.td(
                `
                    This field is optional, leave it blank if you do
                    not want to provide it.
                    Your nickname should be longer than 0 characters,
                    shorter than 16 characters.
                `,
                doe.br(),
                view.span_status_nickname_validity=doe.span(),
            )
        )
    }
    function changePasswordTr(){
        return doe.tr(
            doe.td({colSpan:2},
                doe.label(
                    view.input_ischangepassword=
                        doe.input({type:'checkbox'}),
                    ' Change password'
                )
            ),
        )
    }
    function passwordTr(){
        return doe.tr({className:'password'},
            doe.td(
                'Password',
                doe.br(),
                view.input_password=doe.input({
                    className:'password',
                    type:'password'
                })
            ),
            doe.td()
        )
    }
    function confirmPasswordTr(){
        return doe.tr({className:'confirmpassword'},
            doe.td(
                'Confirm password',
                doe.br(),
                view.input_confirmpassword=doe.input({
                    className:'password',
                    type:'password',
                })
            ),
            doe.td(
                view.span_status_confirmpassword=doe.span(),
            )
        )
    }
    function submitTr(){
        return doe.tr(
            doe.td({colSpan:2},
                view.input_submit=doe.input('Submit',{type:'submit'})
            ),
        )
    }
    let
        edituser=this,
        checker,
        view=new View,
        node=doe.div({className:'edituser'},
            doe.h1('Edit User'),
            view.form=doe.form(
                doe.table(
                    usernameTr(),
                    nicknameTr(),
                    changePasswordTr(),
                    view.tr_password=passwordTr(),
                    view.tr_confirmpassword=confirmPasswordTr(),
                    submitTr(),
                )
            )
        )
    ;(async()=>{
        let cu=await this._site.currentUser;
        await cu.load(['username','nickname']);
        checker=new Checker(this,cu);
        view.input_username.value=cu.username;
        view.input_username.removeAttribute('disabled');
        view.input_nickname.value=cu.nickname;
        view.input_nickname.removeAttribute('disabled');
        view.input_submit.removeAttribute('disabled');
    })();
    view.input_username.addEventListener('input',async()=>{
        let
            s=view.input_username.value,
            valid=checker.isValidUsername(s);
        updater.updateUsernameVadility(
            view.span_status_username_validity,s.length,valid?1:0
        );
        if(!valid)
            return
        updater.updateUsernameAvailability(
            view.span_status_username_availability,
            0
        );
        let sb=Symbol();
        this._lastUsernameAvailabilityChecking=sb;
        let isAvailable=await checker.isAvailableUsername(s);
        if(this._lastUsernameAvailabilityChecking!=sb)
            return
        updater.updateUsernameAvailability(
            view.span_status_username_availability,
            isAvailable?2:1
        );
    });
    view.input_nickname.addEventListener('input',()=>{
        updater.updateNicknameValidity(
            view.span_status_nickname_validity,
            view.input_nickname.value.length,
            checker.isValidNickname(view.input_nickname.value)?1:0
        );
    });
    view.input_password.addEventListener('input',()=>{
        checkPasswordValidity();
    });
    view.input_confirmpassword.addEventListener('input',()=>{
        checkPasswordValidity();
    });
    view.input_ischangepassword.addEventListener('change',()=>{
        view.tr_password.style.display=
        view.tr_confirmpassword.style.display=
            view.input_ischangepassword.checked?
                'table-row'
            :
                'none';
    });
    view.form.addEventListener('submit',async e=>{
        e.preventDefault();
        let data={
            username:view.input_username.value,
            nickname:view.input_nickname.value,
        };
        if(view.input_ischangepassword.checked)
            data.password=view.input_password.value;
        let res=await edituser._site.send({
            function:'updateUser',
            set:data,
        });
        // to-do: recheck username if failed
        location='/';
    });
    return node
}}

var style = `.edituser{
    margin:32px auto 0;
    max-width:600px;
}
.edituser input{
    padding:4px;
}
.edituser td{
    padding:16px;
}
.edituser input.username{
    width:120px;
}
.edituser input.nickname{
    width:120px;
}
.edituser tr.password{
    display:none;
}
.edituser input.password{
    width:120px;
}
.edituser tr.confirmpassword{
    display:none;
}
.edituser input.confirmpassword{
    width:120px;
}
`

function Edituser(site){
    this._site=site;
    this._site.applyPlugins('edituser',this);
}
Object.defineProperty(Edituser.prototype,'view',view);
Edituser.style=doe.style(style);

let site=new Site;
async function createEdituserView(){
    return(new Edituser(site)).view
}
general();
site.on('userChange',()=>
    location='/'
)
;(async()=>{
    doe.head(Edituser.style);
    doe.body(await createEdituserView());
})();
