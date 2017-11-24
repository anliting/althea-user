import{dom}from'/lib/core.static.js'
import Checker from './Checker.js'
import updater from './updater.js'
import View from './View.js'
export default{get(){
    function checkPasswordValidity(){
        let valid=
            view.input_password.value==view.input_confirmpassword.value
        updater.updatePasswordValidity(
            view.span_status_confirmpassword,
            valid?1:0
        )
    }
    function checkSubmitAvalibality(){
    }
    function usernameTr(){
        return dom.tr(
            dom.td(
                'Username',
                dom.br(),
                view.input_username=dom.input({
                    className:'username',
                    disabled:true
                })
            ),
            dom.td(
                `
                    This field is required. 
                    Your username should be longer than 0 characters, 
                    not longer than 16 characters, and only include 
                    lowercase letters and numbers.
                `,
                dom.br(),
                view.span_status_username_validity=dom.span(),
                dom.br(),
                view.span_status_username_availability=dom.span(),
            )
        )
    }
    function nicknameTr(){
        return dom.tr(
            dom.td(
                'Nickname',
                dom.br(),
                view.input_nickname=dom.input({
                    className:'nickname',
                    disabled:true
                })
            ),
            dom.td(
                `
                    This field is optional, leave it blank if you do
                    not want to provide it.
                    Your nickname should be longer than 0 characters,
                    shorter than 16 characters.
                `,
                dom.br(),
                view.span_status_nickname_validity=dom.span(),
            )
        )
    }
    function changePasswordTr(){
        return dom.tr(
            dom.td({colSpan:2},
                dom.label(
                    view.input_ischangepassword=
                        dom.input({type:'checkbox'}),
                    ' Change password'
                )
            ),
        )
    }
    function passwordTr(){
        return dom.tr({className:'password'},
            dom.td(
                'Password',
                dom.br(),
                view.input_password=dom.input({
                    className:'password',
                    type:'password'
                })
            ),
            dom.td()
        )
    }
    function confirmPasswordTr(){
        return dom.tr({className:'confirmpassword'},
            dom.td(
                'Confirm password',
                dom.br(),
                view.input_confirmpassword=dom.input({
                    className:'password',
                    type:'password',
                })
            ),
            dom.td(
                view.span_status_confirmpassword=dom.span(),
            )
        )
    }
    function submitTr(){
        return dom.tr(
            dom.td({colSpan:2},
                view.input_submit=dom.input('Submit',{type:'submit'})
            ),
        )
    }
    let
        edituser=this,
        checker,
        view=new View,
        node=dom.div({className:'edituser'},
            dom.h1('Edit User'),
            view.form=dom.form(
                dom.table(
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
        let cu=await this._site.currentUser
        await cu.load(['username','nickname'])
        checker=new Checker(this,cu)
        view.input_username.value=cu.username
        view.input_username.removeAttribute('disabled')
        view.input_nickname.value=cu.nickname
        view.input_nickname.removeAttribute('disabled')
        view.input_submit.removeAttribute('disabled')
    })()
    view.input_username.addEventListener('input',async()=>{
        let
            s=view.input_username.value,
            valid=checker.isValidUsername(s)
        updater.updateUsernameVadility(
            view.span_status_username_validity,s.length,valid?1:0
        )
        if(!valid)
            return
        updater.updateUsernameAvailability(
            view.span_status_username_availability,
            0
        )
        let sb=Symbol()
        this._lastUsernameAvailabilityChecking=sb
        let isAvailable=await checker.isAvailableUsername(s)
        if(this._lastUsernameAvailabilityChecking!=sb)
            return
        updater.updateUsernameAvailability(
            view.span_status_username_availability,
            isAvailable?2:1
        )
    })
    view.input_nickname.addEventListener('input',()=>{
        updater.updateNicknameValidity(
            view.span_status_nickname_validity,
            view.input_nickname.value.length,
            checker.isValidNickname(view.input_nickname.value)?1:0
        )
    })
    view.input_password.addEventListener('input',()=>{
        checkPasswordValidity()
    })
    view.input_confirmpassword.addEventListener('input',()=>{
        checkPasswordValidity()
    })
    view.input_ischangepassword.addEventListener('change',()=>{
        view.tr_password.style.display=
        view.tr_confirmpassword.style.display=
            view.input_ischangepassword.checked?
                'table-row'
            :
                'none'
    })
    view.form.addEventListener('submit',async e=>{
        e.preventDefault()
        let data={
            username:view.input_username.value,
            nickname:view.input_nickname.value,
        }
        if(view.input_ischangepassword.checked)
            data.password=view.input_password.value
        let res=await edituser._site.send({
            function:'updateUser',
            set:data,
        })
        // to-do: recheck username if failed
        location='/'
    })
    return node
}}
